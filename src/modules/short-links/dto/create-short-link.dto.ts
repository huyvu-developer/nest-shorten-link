import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsInt,
  IsOptional,
} from 'class-validator';

export class CreateShortLinkDto {
  @IsInt()
  @IsOptional()
  userId?: number | null;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  originalUrl: string;
}
