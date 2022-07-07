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

  public async getUserByUUID(uuid): Promise<User | null> {
    const docSession = await this.docDataService.getSingle();

    if (docSession) {
      return docSession.users.find((el) => el.uuid === uuid) || null;
    }

    return null;
  }

  public getUserBySession(docSession: DocSession | undefined, userName: string): User | null {
    return docSession?.users.find((el) => el.username === userName) || null;
  }

  public checkLimit(docSession: DocSession | undefined) {
    return (docSession?.users.length ?? 0) >= AuthService.MAX_PEOPLE;
  }

  public async deleteOrUpdateIfLastSession(uuid: string): Promise<boolean | undefined | User> {
    const docSession = await this.docDataService.getSingle();

    if (!docSession) {
      return false;
    }

    // if user not in docsession
    if (!docSession.users.some((el) => el.uuid === uuid)) {
      return false;
    }

    // if user in docsession and last one
    if (docSession.users.length <= 1) {
      await this.docDataService.deleteSession();
      return false;
    }

    // remove user and update session and return new one
    return this.docDataService.removeUserFromSessions(uuid);
  }
}
