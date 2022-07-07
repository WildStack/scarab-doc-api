import { plainToInstance, Transform } from 'class-transformer';
import { User } from './user';

export interface DocSessionProps {
  users: User[];
  content: any;
  uuid: string;
}

export class DocSession implements DocSessionProps {
  @Transform(({ value }) => plainToInstance(User, value || []))
  public users: User[];

  public content: any;
  public uuid: string;
}
