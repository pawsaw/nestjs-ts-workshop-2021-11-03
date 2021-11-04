import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsPositive,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Book } from './book';
import { Publisher } from './publisher';

export class CreatePublisherDto implements Publisher {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  url: string;
}

export class CreateBookDto implements Omit<Book, 'isbn'> {
  @IsString()
  @Length(5)
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  subtitle: string;

  @IsString()
  @ApiProperty()
  abstract: string;

  @IsInt()
  @IsPositive()
  @ApiProperty()
  numPages: number;

  @IsString()
  @ApiProperty()
  author: string;

  @ValidateNested()
  @Type(() => CreatePublisherDto)
  @ApiProperty()
  publisher: CreatePublisherDto;
}
