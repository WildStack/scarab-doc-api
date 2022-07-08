export interface UserProps {
  uuid: string;
  color: string;
  username: string;
  top: number;
  currentLineText: string;
}

export class User implements UserProps {
  public uuid: string;
  public color: string;
  public username: string;
  public top: number;
  public currentLineText: string;
}
