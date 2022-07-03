import { Injectable } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Injectable()
export class SocketService {
  constructor(private readonly socketGateway: SocketGateway) {}

  sendMessageToUser(socketId: string, namespace: string, value: any) {
    this.socketGateway.wss.sockets.to(socketId).emit(namespace, value);
  }
}
