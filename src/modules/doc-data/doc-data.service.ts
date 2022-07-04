import { Injectable } from '@nestjs/common';
import { DocSession } from 'src/models/entities/doc-session';
import { User } from 'src/models/entities/user';
import { v4 as uuid } from 'uuid';
import { DocDataRepository } from './doc-data.repository';

@Injectable()
export class DocDataService {
  public static MAX_PEOPLE = 5;

  constructor(private readonly docDataRepository: DocDataRepository) {}

  public getSingle(): Promise<DocSession> {
    return this.docDataRepository.getSingle();
  }

  public async initializeSession(): Promise<DocSession> {
    const newDocSession = new DocSession({
      content: null,
      users: [],
      uuid: uuid(),
    });

    await this.docDataRepository.createSingle(newDocSession);

    return this.getSingle();
  }

  public async addUserToSession(user: User): Promise<DocSession> {
    const docSession = await this.getSingle();

    docSession.users = [...docSession.users, user];

    await this.docDataRepository.updateSingle(docSession);

    return this.getSingle();
  }
}
