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
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly docDataService: DocDataService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  public async check(@Body() authCheckDto: AuthCheckDto) {
    // check doc session
    const docSession = await this.authService.checkOrCreateDocSession();

    // check if user exists in this session
    let user = this.authService.getUser(docSession, authCheckDto.username);

    if (user) {
      throw new BadRequestException('user already exists');
    }

    if (!user && this.authService.checkLimit(docSession)) {
      throw new UnauthorizedException('max people occupied (5)'); // for now 5 is limit
    }

    if (!user) {
      user = new User({
        username: authCheckDto.username,
        color: getRandomLightColorRgb(),
        uuid: uuid(),
      });

      await this.docDataService.addUserToSession(user);
    }

    return user;
  }
}
