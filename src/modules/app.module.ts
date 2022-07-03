import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DocDataModule } from './doc-data/doc-data.module';
import { environment } from 'src/enviroment';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [
    AuthModule,
    SocketModule,
    DocDataModule,
    CacheModule.register({
      store: redisStore,
      host: environment.REDIS_HOST,
      port: environment.REDIS_PORT,
      isGlobal: true,
      ttl: 0,
    }),
  ],
  providers: [],
})
export class AppModule {}
