import { IsNotEmpty, IsString } from 'class-validator';

export class AuthCheckDto {
  @IsNotEmpty()
  @IsString()
  username: string;
}
