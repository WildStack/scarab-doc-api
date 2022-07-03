import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { environment } from './enviroment';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

NestFactory.create<NestExpressApplication>(AppModule).then(async (app) => {
  const port = environment.PORT;
  const glValidationPipe = new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  // globals
  app.enableCors({ origin: true });
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(glValidationPipe);
  app.set('trust proxy', 1);

  await app.listen(port);

  console.log({
    platform: 'nestjs',
    library: 'express',
    enviroment: environment.NODE_ENV,
    port,
  });
});
