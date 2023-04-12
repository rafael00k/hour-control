import { Module } from '@nestjs/common';
import { TimeSheetService } from './time-sheet.service';
import { TimeSheetController } from './time-sheet.controller';
import { DatabaseModule } from 'src/database/database.module';
import { timeSheetProviders } from './time-sheet.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TimeSheetController],
  providers: [...timeSheetProviders,TimeSheetService]
})
export class TimeSheetModule {}
