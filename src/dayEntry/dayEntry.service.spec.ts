import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { DayEntry } from './entities/dayEntry.entity';
import { TimeSheet } from '../timeSheet/entities/timeSheet.entity';
import { DayEntryService } from './dayEntry.service';
import * as dayjs from 'dayjs'
import { ConflictException, ForbiddenException } from '@nestjs/common';
import { DayEntryDataSource } from '../timeSheet/datasource/dayEntry.datasource';
import { TimeSheetDataSource } from '../timeSheet/datasource/timeSheet.datasource';
import { DateStringTypes } from 'src/common/dateStrinTypes';


describe('DayEntryService', () => {
  let service: DayEntryService;
  let timeSheetDataSource: TimeSheetDataSource
  let dayEntryDataSource: DayEntryDataSource
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DayEntryService,TimeSheetDataSource, DayEntryDataSource, 
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

    service = await module.resolve(DayEntryService);
    timeSheetDataSource = await module.resolve(TimeSheetDataSource)
    dayEntryDataSource = await module.resolve(DayEntryDataSource)
  });

  describe('Create Entry',() => {
    it('should create a new dayEntry for a empty month', async () => {
      const entryHour = new Date()
      const day = dayjs(entryHour).format(DateStringTypes.DAY)
      const month = dayjs(entryHour).format(DateStringTypes.MONTH)
      jest.spyOn(timeSheetDataSource, 'findByMonth').mockReturnValue(undefined)
      jest.spyOn(dayEntryDataSource,'findDayEntryByDay').mockReturnValue(undefined)
      jest.spyOn(timeSheetDataSource,'create').mockResolvedValue({
        month
      })
      jest.spyOn(dayEntryDataSource,'create').mockResolvedValue(
        {
          day,
          hours: [entryHour],
          timeSheet: new TimeSheet()
  
        }
      )
      
      expect(await service.createEntry({dataHora: entryHour.toISOString()})).toStrictEqual({
        day,
        hours: [entryHour],
        timeSheet: new TimeSheet()
  
      })
    });
  
    it('should not allow more than 4 entry for a day', async () => {
      const entryHour = new Date()
      const day = dayjs(entryHour).format(DateStringTypes.DAY)
      jest.spyOn(dayEntryDataSource,'findDayEntryByDay').mockResolvedValue({
        day,
        hours: [entryHour,entryHour,entryHour,entryHour],
        timeSheet: new TimeSheet() 
      })
      try {
        await service.createEntry({dataHora: entryHour.toISOString()})
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException)
        expect(error?.message).toEqual('Apenas 4 horários podem ser registrados por dia')  
      }  
    })
  
    it('should not allow a same hour entry twice', async() => {
      const entryHour = new Date()
      const day = dayjs(entryHour).format(DateStringTypes.DAY)
      jest.spyOn(dayEntryDataSource,'findDayEntryByDay').mockResolvedValue({
        day,
        hours: [entryHour,entryHour],
        timeSheet: new TimeSheet() 
      })
      try {
        await service.createEntry({dataHora: entryHour.toISOString()})
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException)
        expect(error?.message).toEqual('Horário já registrado')  
      }    
    })
  })

  
});
