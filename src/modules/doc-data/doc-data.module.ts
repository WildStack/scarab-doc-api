import { Module } from '@nestjs/common';
import { DocDataController } from './doc-data.controller';
import { DocDataRepository } from './doc-data.repository';
import { DocDataService } from './doc-data.service';

@Module({
  controllers: [DocDataController],
  providers: [DocDataService, DocDataRepository],
  exports: [DocDataService, DocDataRepository],
})
export class DocDataModule {}
