import { Injectable } from '@nestjs/common';
import { DocSession } from 'src/models/entities/doc-session';
import { User } from 'src/models/entities/user';
import { DocDataRepository } from '../doc-data/doc-data.repository';

interface IsSessionOpenProps {
  isFull: boolean;
  docSession: DocSession | null;
}

@Injectable()
export class AuthService {
  // public static MAX_PEOPLE = 5;
  // constructor(private readonly docDataRepository: DocDataRepository) {}
  // public async getAll(): Promise<any> {
  //   return this.docDataRepository.getAll();
  // }
  // public async isSessionOpen(uuid: string): Promise<IsSessionOpenProps> {
  //   const docSession = await this.docDataRepository.getDocSession(uuid);
  //   if (docSession) {
  //     return {
  //       isFull: docSession.users.length >= AuthService.MAX_PEOPLE,
  //       docSession,
  //     };
  //   }
  //   return { isFull: false, docSession: null };
  // }
  // public async openSession(user: User) {
  //   return this.docDataRepository.createSession(user);
  // }
}
