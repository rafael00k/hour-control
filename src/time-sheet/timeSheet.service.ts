import { ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as dayjs from 'dayjs'
import { DayEntryDataSource } from './datasource/dayEntry.datasource';
import { TimeSheetDataSource } from './datasource/timeSheet.datasource';
import { CreateEntryDto } from './dto/createEntry.dto';
import { CreateEntryOutputDTO } from './dto/createEntry.output.dto';
import { mapCreateEntryToDTO } from './dto/timeSheet.mapper';
import { DayEntry } from './entities/dayEntry.entity';
import { TimeSheet } from './entities/timeSheet.entity';

@Injectable()
export class TimeSheetService {
  constructor(
    @Inject(DayEntryDataSource) private readonly dayEntryDataSource: DayEntryDataSource,
    @Inject(TimeSheetDataSource) private readonly timeSheetDataSource: TimeSheetDataSource
  ) {}
  async createEntry(input: CreateEntryDto): Promise<CreateEntryOutputDTO> {
    const day = dayjs(input.dataHora).format('YYYY-MM-DD')
    const dayEntry = await this.dayEntryDataSource.findDayEntryByDay(day)
    if(!dayEntry) { 
      return this.handleTimeShetCreation(input.dataHora)
    }
    this.validateDayEntry(input.dataHora,dayEntry)
    const updatedEntry = await this.dayEntryDataSource.addEntry(day,input.dataHora)
    return mapCreateEntryToDTO(updatedEntry)

  }

  async getTimeSheet(month: string): Promise<TimeSheet> {
    const timeSheet = await this.timeSheetDataSource.findByMonth(month)
    if(!timeSheet) {
      throw new NotFoundException("Relatório não encontrado")
    }
    const entrys = await this.dayEntryDataSource.findDayEntrysByTimeSheet(timeSheet)
    return {
      month,
      entrys
    }
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

  private async handleTimeShetCreation(entry: Date): Promise<CreateEntryOutputDTO> {
    const month = dayjs(entry).format('YYYY-MM')
    const day = dayjs(entry).format('YYYY-MM-DD')
    const monthSheet = await this.timeSheetDataSource.findByMonth(month)
    if(!monthSheet) {
      const timeSheet = await this.timeSheetDataSource.create(month)
      const dayEntry = await  this.dayEntryDataSource.create(day,entry,timeSheet)
      return mapCreateEntryToDTO(dayEntry)
    }

    const dayEntry = await this.dayEntryDataSource.create(day,entry,monthSheet)
    return mapCreateEntryToDTO(dayEntry)
  }
    



}
