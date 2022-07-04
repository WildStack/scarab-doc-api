import { Injectable } from '@nestjs/common';
import { DocSession } from 'src/models/entities/doc-session';
import { User } from 'src/models/entities/user';
import { DocDataService } from '../doc-data/doc-data.service';

@Injectable()
export class AuthService {
  public static MAX_PEOPLE = 5;

  constructor(private readonly docDataService: DocDataService) {}

  public async checkOrCreateDocSession(): Promise<DocSession | undefined> {
    let docSession = await this.docDataService.getSingle();

    if (!docSession) {
      docSession = await this.docDataService.initializeSession();
    }

    return docSession;
  }

  public getUser(
    docSession: DocSession | undefined,
    userName: string,
  ): User | null {
    return docSession?.users.find((el) => el.username === userName) || null;
  }

  public checkLimit(docSession: DocSession | undefined) {
    return (docSession?.users.length ?? 0) >= AuthService.MAX_PEOPLE;
  }
}
