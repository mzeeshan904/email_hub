import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './elasticsearch.service';
import UserSearchService from './user.service';
import { query } from 'express';

@Controller('search')
export class SearchController {
  constructor(private readonly elasticsearchService: SearchService, private readonly userService: UserSearchService) {}

  @Get()
  async search(@Query('q') query: string) {
    const result = await this.elasticsearchService.search('my-index', {
      query: {
        match: {
          message: query,
        },
      },
    });
    console.log("result ==>>", result)
    return result.hits.hits;
  }

  @Get("/user")
  async addUser() {
    const result = await this.userService.indexUser( {
      
        id: Math.random()*1000,
        firstName: "muhammad",
        lastName: "Zeeshan " + Math.random()*1000,
        email: "mzee904904@gmail.com"
      
    });
    console.log("result ==>>", result)
    return result;
  }

  @Get("/user/search")
  async searchUser( @Query() query) {
    // return q
    const result = await this.userService.search(query.search);
    console.log("result ==>>", result)
    return result;
  }
  
}
