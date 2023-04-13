import { Module } from '@nestjs/common';
import { TimeSheetService } from './timeSheet.service';
import { TimeSheetController } from './timeSheet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeSheet } from './entities/timeSheet.entity';
import { timeSheetSchema } from './datasource/schemas/timeSheet.schema';
import { DayEntry } from '../dayEntry/entities/dayEntry.entity';
import { dayEntrytSchema } from './datasource/schemas/dayEntry.schema';
import { DayEntryDataSource } from './datasource/dayEntry.datasource';
import { TimeSheetDataSource } from './datasource/timeSheet.datasource';

@Module({
  imports: [MongooseModule.forFeature(
    [
      {name: TimeSheet.name, schema: timeSheetSchema},
      { name: DayEntry.name, schema: dayEntrytSchema} 
    ]
  )
  ],
  controllers: [TimeSheetController],
  providers: [TimeSheetService, DayEntryDataSource, TimeSheetDataSource ]
})
export class TimeSheetModule {}
