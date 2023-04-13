import { Controller, Post, Body } from '@nestjs/common';
import { CreateEntryInputDto } from '../dayEntry/dto/createEntry.input.dto';
import { DayEntryService } from './dayEntry.service';
import { mapCreateEntryToDTO } from './dto/dayEntry.mapper';

@Controller(`${process.env.VERSION_TAG}/batidas`)
export class DayEntryController {
  constructor(private readonly dayEntryService: DayEntryService) {}

  

  @Post()
  async createEntry(@Body() createEntryDto: CreateEntryInputDto) {
    const result = await this.dayEntryService.createEntry(createEntryDto);
    return mapCreateEntryToDTO(result)
  }
}
