import { Prop, Schema } from "@nestjs/mongoose"
import mongoose from "mongoose"
import { TimeSheet } from "../../timeSheet/entities/timeSheet.entity"

@Schema()
export class DayEntry {
    @Prop()
    day: string

    @Prop([Date])
    hours: Date[]

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'TimeSheet'}]})
    timeSheet: TimeSheet
}
