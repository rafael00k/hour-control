import { DayEntry } from "./entities/dayEntry.entity"
import * as dayjs from 'dayjs'
import { mapCreateEntryToDTO } from "./dto/dayEntry.mapper"

describe('Map Create Entry', () => {
    it('should return the correct response', () => {
        const hourEntry = new Date()
        const day = dayjs(hourEntry).format('YYYY-MM-DD')
        const month =  dayjs(hourEntry).format('YYYY-MM')
        const formattedDate = dayjs(hourEntry).format('HH:mm:ss')
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
