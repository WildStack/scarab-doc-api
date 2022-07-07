import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DocSession } from 'src/models/entities/doc-session';
import { User } from 'src/models/entities/user';
import { v4 as uuid } from 'uuid';
import { DocDataRepository } from './doc-data.repository';

@Injectable()
export class DocDataService {
  constructor(private readonly docDataRepository: DocDataRepository) {}

  public getSingle(): Promise<DocSession | undefined> {
    return this.docDataRepository.getSingle();
  }

  public async initializeSession(): Promise<DocSession | undefined> {
    const newDocSession = new DocSession();
    newDocSession.content = null;
    newDocSession.users = [];
    newDocSession.uuid = uuid();

    await this.docDataRepository.createSingle(newDocSession);

    return this.getSingle();
  }

  public async addUserToSession(user: User): Promise<DocSession | undefined> {
    const docSession = await this.getSingle();

    if (docSession) {
      docSession.users = [...docSession.users, user];

      await this.docDataRepository.updateSingle(docSession);
    }

    return this.getSingle();
  }

  public async removeUserFromSessions(uuid: string): Promise<User | undefined> {
    const docSession = await this.getSingle();
    const user = docSession?.users.find((el) => el.uuid === uuid);

    if (docSession) {
      docSession.users = docSession.users.filter((el) => el.uuid !== uuid);

      await this.docDataRepository.updateSingle(docSession);
    }

    return plainToInstance(User, user);
  }

  public deleteSession(): Promise<any> {
    return this.docDataRepository.deleteSingle();
  }
}
