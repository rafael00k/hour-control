import { Prop, Schema } from "@nestjs/mongoose"
import { DayEntry } from "./dayEntry.entity"

@Schema()
export class TimeSheet {
    @Prop()
    month: string

    entrys: DayEntry[] 
}
