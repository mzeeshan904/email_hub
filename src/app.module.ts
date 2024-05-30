import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {SearchModule} from "./elastic-search/search.module"

@Module({
  imports: [SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
