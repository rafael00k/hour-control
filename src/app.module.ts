import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './config/database.config';
import { TimeSheetModule } from './time-sheet/time-sheet.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [
      databaseConfig
    ]
  }), TimeSheetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
