import {
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(80, { namespace: '/app' })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() public wss: Server;

  async handleConnection(@ConnectedSocket() client: Socket) {
    return 1;
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    return 1;
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
}
