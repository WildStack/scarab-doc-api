import figlet from 'figlet';
import express from 'express';
import compression from 'compression';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { environment } from './enviroment';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { cyanLog } from './common/helper';

NestFactory.create<NestExpressApplication>(AppModule).then(async app => {
  app.enableShutdownHooks();
  app.set('trust proxy', true);
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(compression());

  // globals
  app.enableCors();
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(environment.PORT);

  // log misc stuff
  cyanLog(
    figlet.textSync(`Running api : ${environment.PORT}`, {
      font: 'Rectangles',
      width: 80,
      whitespaceBreak: true,
    }),
  );
});
