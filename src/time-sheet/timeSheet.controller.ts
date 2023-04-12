import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateEntryDto } from './dto/createEntry.dto';
import { TimeSheetService } from './timeSheet.service';


@Controller('/batidas')
export class TimeSheetController {
  constructor(private readonly timeSheetService: TimeSheetService) {}

  @Post()
  createEntry(@Body() createEntryDto: CreateEntryDto) {
    return this.timeSheetService.createEntry(createEntryDto);
  }

  @Get('/:month')
  getTimeSheet(@Param('month') month: string) {
    return this.timeSheetService.getTimeSheet(month)     
  }
}
