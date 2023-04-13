import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DayEntryModule } from './dayEntry/dayEntry.module';
import { TimeSheetModule } from './timeSheet/timeSheet.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URL), TimeSheetModule, DayEntryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
