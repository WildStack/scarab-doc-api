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

    client.broadcast.emit(consts.socketEvents.userAdded, newUser);

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
