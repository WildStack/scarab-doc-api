import { Body, Controller, Put } from '@nestjs/common';
import { DocDataDtoNotify } from 'src/models/dto/doc-data.dto';
import { SocketService } from 'src/socket/socket.service';
import { DocDataService } from './doc-data.service';

@Controller('doc-data')
export class DocDataController {
  constructor(
    private readonly docDataService: DocDataService,
    private readonly socketService: SocketService,
  ) {}

  @Put()
  public async notifyUpdate(@Body() docDataDtoNotify: DocDataDtoNotify) {
    await this.docDataService.updateSessionContent(docDataDtoNotify);
  }
}
