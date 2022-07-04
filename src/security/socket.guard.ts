import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class SocketGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToWs();
    const uuid = request.getClient().handshake?.auth?.uuid;

    if (!uuid) {
      throw new WsException('uuid is missing');
    }

    return true;
  }
}
