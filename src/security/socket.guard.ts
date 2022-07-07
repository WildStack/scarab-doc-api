import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { uuidRegex } from 'src/common/constants';

@Injectable()
export class SocketGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToWs();
    const uuid = request.getClient().handshake?.auth?.uuid;

    if (!uuid) {
      throw new WsException('uuid is missing');
    }

    if (!uuidRegex.test(uuid)) {
      throw new WsException('invalid uuid');
    }

    return true;
  }
}
