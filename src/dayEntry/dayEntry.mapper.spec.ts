import { DayEntry } from "./entities/dayEntry.entity"
import * as dayjs from 'dayjs'
import { mapCreateEntryToDTO } from "./dto/dayEntry.mapper"
import { DateStringTypes } from "../common/dateStrinTypes"

describe('Map Create Entry', () => {
    it('should return the correct response', () => {
        const hourEntry = new Date()
        const day = dayjs(hourEntry).format(DateStringTypes.DAY)
        const month =  dayjs(hourEntry).format(DateStringTypes.MONTH)
        const formattedDate = dayjs(hourEntry).format(DateStringTypes.HOUR)
        const mockDayEntry: DayEntry = {
            day,
            hours: [hourEntry],
            timeSheet: {
                month
            }
        }
        expect(mapCreateEntryToDTO(mockDayEntry)).toStrictEqual({
            dia: day,
            horarios: [formattedDate]        
        })    
    })
    
})
