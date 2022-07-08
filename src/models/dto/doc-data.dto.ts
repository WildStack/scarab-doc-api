import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class DocDataDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}

export class DocDataDtoNotify {
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  uuid: string;

  @IsNotEmpty()
  @IsNumber()
  top: number;

  @IsOptional()
  @IsString()
  // @IsNotEmpty()
  currentLineText: string;
}
