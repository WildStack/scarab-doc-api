import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { environment } from './enviroment';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

NestFactory.create<NestExpressApplication>(AppModule).then(async (app) => {
  const logger: Logger = new Logger('Main');

  // globals
  app.enableCors();
  app.setGlobalPrefix('/api');
  app.set('trust proxy', 1);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(environment.PORT);

  // log
  const apiUrl: string = await app.getUrl();
  logger.verbose(`Application listening on --- ${apiUrl}`);
});
