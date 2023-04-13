import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import {  mapTimeSheetToDTO } from './dto/timeSheet.mapper';
import { TimeSheetService } from './timeSheet.service';


@Controller(`${process.env.VERSION_TAG}/folhas-de-ponto`)
export class TimeSheetController {
  constructor(private readonly timeSheetService: TimeSheetService) {}

  @Get('/:month')
  async getTimeSheet(@Param('month') month: string) {
    const result = await this.timeSheetService.getTimeSheet(month)
    return mapTimeSheetToDTO(result)     
  }
}
