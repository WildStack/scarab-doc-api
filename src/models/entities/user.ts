export interface UserProps {
  uuid: string;
  color: string;
  username: string;
}

export class User implements UserProps {
  public uuid: string;
  public color: string;
  public username: string;

  constructor(props: UserProps) {
    this.uuid = props.uuid;
    this.color = props.color;
    this.username = props.username;
  }
}
