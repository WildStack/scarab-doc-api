import { Module } from '@nestjs/common';
import { SocketModule } from 'src/socket/socket.module';
import { DocDataController } from './doc-data.controller';
import { DocDataRepository } from './doc-data.repository';
import { DocDataService } from './doc-data.service';

@Module({
  imports: [SocketModule],
  controllers: [DocDataController],
  providers: [DocDataService, DocDataRepository],
  exports: [DocDataService],
})
export class DocDataModule {}
