import { Module } from '@nestjs/common';
import { DocDataController } from './doc-data.controller';
import { DocDataService } from './doc-data.service';

@Module({
  controllers: [DocDataController],
  providers: [DocDataService],
})
export class DocDataModule {}
