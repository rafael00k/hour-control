import { Prop, Schema } from "@nestjs/mongoose"
import { DayEntry } from "../../dayEntry/entities/dayEntry.entity"

@Schema()
export class TimeSheet {
    @Prop()
    month: string

    entrys?: DayEntry[] 
}
