import { CreateEntryOutputDTO } from "../../dayEntry/dto/createEntry.output.dto";
import { DayEntry } from "../../dayEntry/entities/dayEntry.entity";
import * as dayjs from 'dayjs'
import { TimeSheet } from "../entities/timeSheet.entity";
import { TimeSheetOutputDTO } from "./timeSheet.output.dto";
import { formatDateToString } from "../../utils/dateFormatter.util";
import { mapCreateEntryToDTO } from "../../dayEntry/dto/dayEntry.mapper";




export function mapTimeSheetToDTO(timeSheet: TimeSheet): TimeSheetOutputDTO {
    const monthlyJourneyInMilli = 1000 * 60 * 60 * 8 * 21 //21 dias por mes e 8 horas por dias
    const totalHours = new Date(handleHourBalance(timeSheet))
    const hourBalance = new Date(totalHours.getTime() - monthlyJourneyInMilli)



    return {
        mes: timeSheet.month,
        horasTrabalhadas: formatDateToString(totalHours),
        horasDevidas: hourBalance.getTime() < 0 ? formatDateToString(hourBalance) : "PT0S",
        horasExcedentes: hourBalance.getTime() > 0 ? formatDateToString(hourBalance) : "PT0S",
        registros: timeSheet.entrys.map(dayEntry => mapCreateEntryToDTO(dayEntry)),


    }
}



function handleHourBalance(timeSheet: TimeSheet) {
    return timeSheet.entrys.map(
        dayEntry => {
            let firstPeriod = 0
            let secondPeriod = 0
            if (dayEntry.hours.length >= 2) {
                firstPeriod = dayEntry.hours[1].getTime() - dayEntry.hours[0].getTime()
            }
            if (dayEntry.hours.length >= 4) {
                secondPeriod = dayEntry.hours[3].getTime() - dayEntry.hours[2].getTime()
            }
            return firstPeriod + secondPeriod

        }
    ).reduce((acc, cur) => acc + cur)



}
