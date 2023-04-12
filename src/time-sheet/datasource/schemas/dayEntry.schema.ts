import { SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"
import { DayEntry } from "src/time-sheet/entities/dayEntry.entity"

export type dayEntryDocument = HydratedDocument<DayEntry>

export const dayEntrytSchema = SchemaFactory.createForClass(DayEntry)
