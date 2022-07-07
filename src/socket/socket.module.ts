import { Module } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { DocDataRepository } from 'src/modules/doc-data/doc-data.repository';
import { DocDataService } from 'src/modules/doc-data/doc-data.service';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';

@Module({
  imports: [],
  providers: [
    SocketGateway,
    SocketService,
    // well
    AuthService,
    DocDataService,
    DocDataRepository,
  ],
  exports: [SocketService],
})
export class SocketModule {}
