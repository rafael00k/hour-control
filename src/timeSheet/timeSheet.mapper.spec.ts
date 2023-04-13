import * as dayjs from 'dayjs'
import { DateStringTypes } from 'src/common/dateStrinTypes'
import { mapCreateEntryToDTO } from 'src/dayEntry/dto/dayEntry.mapper'
import { mapTimeSheetToDTO } from './dto/timeSheet.mapper'


describe('TimeSheetMapper', () => {

  it('should return the correct response', () => {
    const entryHourDate = new Date(2022, 8, 22, 8)
    const entryHour = dayjs(entryHourDate)
    const nextDay = entryHour.add(1, 'day')
    const month = entryHour.format(DateStringTypes.MONTH)
    const mockEntrys = {
      month,
      entrys: [{
        day: entryHour.format(DateStringTypes.DAY),
        hours: [entryHourDate, entryHour.add(4, 'hours').toDate()],
        timeSheet: { month }
      }, {
        day: nextDay.format(DateStringTypes.DAY),
        hours: [entryHourDate, entryHour.add(3, 'hours').toDate()],
        timeSheet: { month }
      }]
    }

    expect(mapTimeSheetToDTO(mockEntrys)).toStrictEqual({
      mes: month,
      horasTrabalhadas: "PT7H0M0S",
      horasDevidas: "PT161H0M0S",
      horasExcedentes: "PT0S",
      registros: [
        {
          dia: "2022-09-22",
          horarios: [
            "08:00:00",
            "12:00:00"
          ]
        },
        {
          dia: "2022-09-23",
          horarios: [
            "08:00:00",
            "11:00:00"
          ]
        },

      ]
    })
  })
})
