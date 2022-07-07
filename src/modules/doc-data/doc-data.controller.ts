import { Body, Controller, Put } from '@nestjs/common';
import { DocDataDtoNotify } from 'src/models/dto/doc-data.dto';
import { DocDataService } from './doc-data.service';

@Controller('doc-data')
export class DocDataController {
  constructor(private readonly docDataService: DocDataService) {}

  @Put()
  public async notifyUpdate(@Body() docDataDtoNotify: DocDataDtoNotify) {
    await this.docDataService.updateSessionContent(docDataDtoNotify);
  }
}
