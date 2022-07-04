import { UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DocSession } from 'src/models/entities/doc-session';
import { AuthService } from 'src/modules/auth/auth.service';
import { SocketGuard } from 'src/security/socket.guard';

@UseGuards(SocketGuard)
@WebSocketGateway({ namespace: 'app' })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() public wss: Server;

  constructor(private readonly authService: AuthService) {}

  public async handleConnection(@ConnectedSocket() client: Socket) {
    // const uuid = client.handshake.auth.uuid as string;
    // // check if session is open
    // const { isFull, docSession } = await this.authService.isSessionOpen(uuid);
    // if (!docSession) {
    //   // const newUser =
    //   // open session
    //   const uuid = await this.authService.openSession();
    // }
    // // check if session limit is full
    // if (isFull) {
    //   // return false
    // }
    // // send to all connected that new guy has arrived (return session id and people)
    // return 1;
  }

  public async handleDisconnect(@ConnectedSocket() client: Socket) {
    return 1;
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
