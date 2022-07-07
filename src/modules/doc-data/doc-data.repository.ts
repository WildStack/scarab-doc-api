import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { plainToInstance } from 'class-transformer';
import { environment } from 'src/enviroment';
import { DocSession } from 'src/models/entities/doc-session';

// can be modified into multiple
@Injectable()
export class DocDataRepository {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  public async getSingle(): Promise<DocSession> {
    const data = await this.cacheManager.get<DocSession>(environment.redisSingleKey);
    return plainToInstance(DocSession, data);
  }

  public createSingle(newDocSession: DocSession): Promise<any> {
    return this.cacheManager.set(environment.redisSingleKey, newDocSession);
  }

  public updateSingle(docSession: DocSession): Promise<any> {
    return this.cacheManager.set(environment.redisSingleKey, docSession);
  }

  public deleteSingle(): Promise<any> {
    return this.cacheManager.del(environment.redisSingleKey);
  }
}
