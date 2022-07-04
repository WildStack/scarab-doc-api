import { Injectable } from '@nestjs/common';
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
    const newDocSession = new DocSession({
      content: null,
      users: [],
      uuid: uuid(),
    });

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
}
