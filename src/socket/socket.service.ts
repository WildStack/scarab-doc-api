import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SocketService {
  private _server: Server;

  public get server(): Server {
    return this._server;
  }

  public set server(value: Server) {
    this._server = value;
  }
}
