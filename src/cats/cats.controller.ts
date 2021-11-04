import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Redirect,
} from '@nestjs/common';

export interface Cat {
  id: number;
  name: string;
}

export interface FindAllCatsQuery {
  like?: string;
}

@Controller('cats')
export class CatsController {
  @Get()
  miau(): string {
    return 'miau';
  }

  @Get('all')
  findAll(@Query() { like }: FindAllCatsQuery): Cat[] {
    let cats = [
      {
        id: 1,
        name: 'Mini',
      },
      {
        id: 2,
        name: 'Maxi',
      },
    ];

    if (like) {
      cats = cats.filter((cat) =>
        cat.name.toLowerCase().includes(like.toLowerCase()),
      );
    }

    return cats;
  }

  @Put(':id')
  createCat(@Param('id') id: number, @Body() cat: Omit<Cat, 'id'>): Cat {
    return {
      id,
      name: cat.name,
    };
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}
