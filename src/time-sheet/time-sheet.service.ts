import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { In, Repository } from 'typeorm';
import { CreateEntryDto } from './dto/create-time-sheet.dto';
// import { UpdateTimeSheetDto } from './dto/update-time-sheet.dto';
import { TimeSheetDayEntry } from './entities/time-sheet-day-entry.entity';
import { TimeSheet } from './entities/time-sheet.entity';

@Injectable()
export class TimeSheetService {
  constructor(
    @Inject('TIME_SHEET_REPOSITORY')
    private timeSheetRepository: Repository<TimeSheet>
  ) {}
  async create(input: CreateEntryDto) {
    const montDate = dayjs(input.dataHora).format('YYY-MM-DD')
    const timeSheet = await this.timeSheetRepository.findOne({
    })
    if(!timeSheet) { 
      // return this.timeSheetRepository.save({
      //   entrys: [{
      //     day: input.dataHora,
      //     hours: [input.dataHora]
      //   }],
      //   month: input.dataHora  
      // })

    }

  }

  private validateTimeSheetEntry(timeSeet: TimeSheet, entry: Date) {
    if(timeSeet.entrys?.length >= 4) {
     throw new ForbiddenException('Apenas 4 horários podem ser registrados por dia') 
    }
  }

  private handleTimeShetCreation(entry: Date) {

  }

  findAll() {
    return `This action returns all timeSheet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} timeSheet`;
  }

  // update(id: number, updateTimeSheetDto: UpdateTimeSheetDto) {
  //   return `This action updates a #${id} timeSheet`;
  // }

  remove(id: number) {
    return `This action removes a #${id} timeSheet`;
  }
}
