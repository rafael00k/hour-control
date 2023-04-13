import { Module } from '@nestjs/common';
import { DayEntryService } from './dayEntry.service';
import { DayEntryController } from './dayEntry.controller';
import { DayEntryDataSource } from '../timeSheet/datasource/dayEntry.datasource';
import { TimeSheetDataSource } from '../timeSheet/datasource/timeSheet.datasource';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeSheet } from '../timeSheet/entities/timeSheet.entity';
import { DayEntry } from './entities/dayEntry.entity';
import { timeSheetSchema } from '../timeSheet/datasource/schemas/timeSheet.schema';
import { dayEntrytSchema } from '../timeSheet/datasource/schemas/dayEntry.schema';

@Module({
  imports: [MongooseModule.forFeature(
    [
      {name: TimeSheet.name, schema: timeSheetSchema},
      { name: DayEntry.name, schema: dayEntrytSchema} 
    ]
  )
  ],
  controllers: [DayEntryController],
  providers: [ DayEntryDataSource, TimeSheetDataSource, DayEntryService ]
})
export class DayEntryModule {}
