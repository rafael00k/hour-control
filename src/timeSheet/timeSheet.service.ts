import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DayEntryDataSource } from './datasource/dayEntry.datasource';
import { TimeSheetDataSource } from './datasource/timeSheet.datasource';
import { TimeSheet } from './entities/timeSheet.entity';

@Injectable()
export class TimeSheetService {
  constructor(
    @Inject(DayEntryDataSource) private readonly dayEntryDataSource: DayEntryDataSource,
    @Inject(TimeSheetDataSource) private readonly timeSheetDataSource: TimeSheetDataSource
  ) { }

  async getTimeSheet(month: string): Promise<TimeSheet> {
    const timeSheet = await this.timeSheetDataSource.findByMonth(month)
    if (!timeSheet) {
      throw new NotFoundException("Relatório não encontrado")
    }
    const entrys = await this.dayEntryDataSource.findDayEntrysByTimeSheet(timeSheet)
    return {
      month,
      entrys
    }
  }
}
