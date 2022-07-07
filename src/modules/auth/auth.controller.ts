import { BadRequestException, Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { User } from 'src/models/entities/user';
import { AuthCheckDto } from 'src/models/dto/auth-check.dto';
import { DocDataService } from '../doc-data/doc-data.service';
import { getRandomLightColorRgb } from 'src/common/common';
import { AuthService } from './auth.service';
import { DocSession } from 'src/models/entities/doc-session';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly docDataService: DocDataService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  public async check(
    @Body() authCheckDto: AuthCheckDto,
  ): Promise<{ docState: DocSession | undefined; user: User }> {
    // check doc session
    const docSession = await this.authService.checkOrCreateDocSession();

    // check if user exists in this session
    let user = this.authService.getUserBySession(docSession, authCheckDto.username);

    if (user) {
      throw new BadRequestException('user already exists');
    }

    if (!user && this.authService.checkLimit(docSession)) {
      throw new UnauthorizedException('max people occupied (5)'); // for now 5 is limit
    }

    if (!user) {
      user = new User();
      user.username = authCheckDto.username;
      user.color = getRandomLightColorRgb();
      user.uuid = uuid();
      user.top = 0;
      user.left = 0;

      await this.docDataService.addUserToSession(user);
    }

    // get updated session
    const docState = await this.docDataService.getSingle();

    return { docState, user };
  }
}
