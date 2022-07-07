import { UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { consts } from 'src/common/constants';
import { environment } from 'src/enviroment';
import { User } from 'src/models/entities/user';
import { AuthService } from 'src/modules/auth/auth.service';
import { SocketGuard } from 'src/security/socket.guard';
import { SocketService } from './socket.service';

@UseGuards(SocketGuard)
@WebSocketGateway({ transports: ['websocket'] })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer() public wss: Server;

  constructor(
    private readonly authService: AuthService,
    private readonly socketService: SocketService,
  ) {}

  afterInit(server: Server) {
    this.socketService.server = server;
  }

  public async handleConnection(@ConnectedSocket() client: Socket) {
    const uuid = client.handshake.auth.uuid as string; // validated in socket guard

    // distribute messages accross all user except sender
    const newUser = await this.authService.getUserByUUID(uuid);

    if (!newUser) return;

    // for other methods
    // client.join(environment.redisSingleKey);

    client.broadcast.emit(consts.socketEvents.userAdded, newUser);

    console.log('connected, uuid: ' + uuid);

    return uuid;
  }

  public async handleDisconnect(@ConnectedSocket() client: Socket) {
    const uuid = client.handshake.auth.uuid as string; // validated in socket guard

    // check if its last user then delete or update (remove user) session
    const shouldDistribute = await this.authService.deleteOrUpdateIfLastSession(uuid);

    // distribute messages accross all user except sender
    if (shouldDistribute && shouldDistribute instanceof User) {
      client.broadcast.emit(consts.socketEvents.userRemoved, shouldDistribute);
    }

    console.log('disconnected, uuid: ' + uuid);

    return uuid;
  }

  @SubscribeMessage('distribute_change')
  public async handleDistributeChange(
    @ConnectedSocket() socket: Socket,
    @MessageBody() content: string,
  ) {
    socket.broadcast.emit(consts.socketEvents.notifyUpdate, content);
  }

  @SubscribeMessage('distribute_caret')
  public async handleDistributeCaret(
    @ConnectedSocket() socket: Socket,
    @MessageBody() content: { top: number; left: number; uuid: string },
  ) {
    socket.broadcast.emit(consts.socketEvents.notifyUpdateCaret, content);
  }
}

// @SubscribeMessage('connect')
// public async handleDuoConnect(@ConnectedSocket() socket: Socket) {
//   const { id, socket_id } = this.userService.userSocketPayload(socket);
//   const user = await this.userService.userSpamAndDetails(id);
//   console.log('joined' + socket_id);
//   // join to user specific id
//   socket.join(socket_id);
//   // update online status
//   this.userService.updateOnlineStatus(user.id, true);
//   // send found user and if anyone matched
//   return await this.duoFinderService.initFirstMatch(user);
//   this.wss.sockets
//     .to(prevFound.socket_id)
//     .emit('duo_match_finder', JSON.parse(serialize(foundAnyone))); // send to user
// }
