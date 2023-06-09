import { DayEntry } from "../entities/dayEntry.entity";
import { CreateEntryOutputDTO } from "./createEntry.output.dto";
import * as dayjs from 'dayjs'
import { DateStringTypes } from "src/common/dateStrinTypes";


export function mapCreateEntryToDTO(dayEntry: DayEntry): CreateEntryOutputDTO {
    return {
        dia: dayEntry.day,
        horarios: dayEntry.hours.map(hour => dayjs(hour).format(DateStringTypes.HOUR))
    }
}
