import { CreateEntryOutputDTO } from "./createEntry.output.dto";
import { DayEntry } from "../entities/dayEntry.entity";
import * as dayjs from 'dayjs'

export function mapCreateEntryToDTO (dayEntry: DayEntry): CreateEntryOutputDTO {
    return {
        dia: dayEntry.day,
        horarios: dayEntry.hours.map(hour => dayjs(hour).format("HH:mm:ss"))
    }
}
