import { ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DayEntryDataSource } from '../timeSheet/datasource/dayEntry.datasource';
import { TimeSheetDataSource } from '../timeSheet/datasource/timeSheet.datasource';
import { CreateEntryInputDto } from './dto/createEntry.input.dto';
import { DayEntry } from './entities/dayEntry.entity';
import * as dayjs from 'dayjs'



@Injectable()
export class DayEntryService {
  constructor(
    @Inject(DayEntryDataSource) private readonly dayEntryDataSource: DayEntryDataSource,
    @Inject(TimeSheetDataSource) private readonly timeSheetDataSource: TimeSheetDataSource
  ) {}
  async createEntry(input: CreateEntryInputDto): Promise<DayEntry> {
    const day = dayjs(input.dataHora).format('YYYY-MM-DD')
    const dayEntry = await this.dayEntryDataSource.findDayEntryByDay(day)
    if(!dayEntry) { 
      return this.handleTimeShetCreation(input.dataHora)
    }
    this.validateDayEntry(input.dataHora,dayEntry)
    return this.dayEntryDataSource.addEntry(day,input.dataHora)
  }

  private validateDayEntry(entry: Date, dayEntry?: DayEntry) {

    if( dayEntry && dayEntry?.hours?.length >= 4) {
     throw new ForbiddenException('Apenas 4 horários podem ser registrados por dia') 
    }

    const sameEntry = dayEntry.hours.find(hour => hour === entry)

    if(sameEntry) {
      throw new ConflictException('Horário já registrado') 
    }
  }

  private async handleTimeShetCreation(entry: Date): Promise<DayEntry> {
    const month = dayjs(entry).format('YYYY-MM')
    const day = dayjs(entry).format('YYYY-MM-DD')
    const monthSheet = await this.timeSheetDataSource.findByMonth(month)
    if(!monthSheet) {
      const timeSheet = await this.timeSheetDataSource.create(month)
      return this.dayEntryDataSource.create(day,entry,timeSheet)
      
    }
    return this.dayEntryDataSource.create(day,entry,monthSheet)
  }
}

