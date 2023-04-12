import { SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { TimeSheet } from "src/time-sheet/entities/timeSheet.entity";

export type timeSheetDocument = HydratedDocument<TimeSheet>

export const timeSheetSchema = SchemaFactory.createForClass(TimeSheet)
