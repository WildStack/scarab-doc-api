import { CacheModule, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DocDataModule } from './doc-data/doc-data.module';
import { environment } from 'src/enviroment';
import { SocketModule } from 'src/socket/socket.module';
import { create as cacheManagerRedisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    AuthModule,
    SocketModule,
    DocDataModule,
    CacheModule.register({
      store: cacheManagerRedisStore({
        port: environment.REDIS_PORT,
        host: environment.REDIS_HOST,
        auth_pass: environment.REDIS_PASSWORD,
        db: 0,
      }),
      host: environment.REDIS_HOST,
      port: environment.REDIS_PORT,
      isGlobal: true,
      ttl: 0,
    }),
  ],
  providers: [],
})
export class AppModule {}
