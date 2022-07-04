import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { User } from 'src/models/entities/user';
import { AuthCheckDto } from 'src/models/dto/auth-check.dto';
import { DocDataService } from '../doc-data/doc-data.service';
import { getRandomLightColorRgb } from 'src/common/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly docDataService: DocDataService) {}

  @Post()
  public async check(@Body() authCheckDto: AuthCheckDto) {
    // check doc session
    let docSession = await this.docDataService.getSingle();

    if (!docSession) {
      docSession = await this.docDataService.initializeSession();
    }

    // check if user exists in this session
    let user = docSession.users.find(
      (el) => el.username === authCheckDto.username,
    );

    if (user) {
      throw new BadRequestException('user already exists');
    }

    if (!user && docSession.users.length >= DocDataService.MAX_PEOPLE) {
      throw new UnauthorizedException('max people occupied');
    }

    if (!user) {
      user = new User({
        color: getRandomLightColorRgb(),
        username: authCheckDto.username,
        uuid: uuid(),
      });

      await this.docDataService.addUserToSession(user);
    }

    return user;
  }
}
