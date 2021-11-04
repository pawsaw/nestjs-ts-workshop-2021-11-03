import { ApiProperty } from '@nestjs/swagger';

export class Publisher {
  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;
}
