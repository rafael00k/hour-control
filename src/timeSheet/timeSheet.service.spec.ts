import { Test, TestingModule } from '@nestjs/testing';
import { TimeSheetDataSource } from './datasource/timeSheet.datasource';
import { TimeSheetService } from './timeSheet.service';
import * as dayjs from 'dayjs'
import { DayEntryDataSource } from './datasource/dayEntry.datasource';
import { getModelToken,InjectModel } from '@nestjs/mongoose';
import { TimeSheet } from './entities/timeSheet.entity';
import { Model } from 'mongoose'
import { DayEntry } from '../dayEntry/entities/dayEntry.entity';
import { ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';

describe('TimeSheetService', () => {
  let service: TimeSheetService;
  let timeSheetDataSource: TimeSheetDataSource
  let dayEntryDataSource: DayEntryDataSource
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeSheetService,TimeSheetDataSource, DayEntryDataSource, 
        {
        provide: getModelToken(TimeSheet.name),
        useValue: Model
        },
        {
          provide: getModelToken(DayEntry.name),
          useValue: Model
        }

    ],
    }).compile();

    service = await module.resolve(TimeSheetService);
    timeSheetDataSource = await module.resolve(TimeSheetDataSource)
    dayEntryDataSource = await module.resolve(DayEntryDataSource)
  });

  describe('Get timeSheet',() => {
    it('should throw an error if a month sheet could not be found', async () => {
      const entryHour = new Date()
      const month = dayjs(entryHour).format('YYYY-MM-DD')
      jest.spyOn(timeSheetDataSource, 'findByMonth').mockResolvedValue(undefined)
      try {
        await service.getTimeSheet(month)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
        expect(error?.message).toEqual("Relatório não encontrado")  
      } 
    });
  
    it('should return the corret result', async () => {
      const entryHourDate = new Date()
      const entryHour = dayjs(entryHourDate)
      const nextDay = entryHour.add(1,'day')
      const month = entryHour.format("YYYY-MM")
      jest.spyOn(timeSheetDataSource,'findByMonth').mockResolvedValue({month})
      jest.spyOn(dayEntryDataSource,'findDayEntrysByTimeSheet').mockResolvedValue([{
        day: entryHour.format("YYYY-MM-DD"),
        hours:[entryHourDate,entryHour.add(3,'hour').toDate()],
        timeSheet: {month}
      },{
        day: nextDay.format("YYYY-MM-DD"),
        hours: [entryHourDate,entryHour.add(4,'hour').toDate()],
        timeSheet: {month}
      }])

      expect(await service.getTimeSheet(month)).toStrictEqual({
        month,
        entrys: [{
          day: entryHour.format("YYYY-MM-DD"),
          hours:[entryHourDate,entryHour.add(3,'hour').toDate()],
          timeSheet: {month}
        },{
          day: nextDay.format("YYYY-MM-DD"),
          hours: [entryHourDate,entryHour.add(4,'hour').toDate()],
          timeSheet: {month}
        }]
      })
      
    })
  })

  
});
