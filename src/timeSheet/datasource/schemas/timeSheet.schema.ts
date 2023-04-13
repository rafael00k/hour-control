import { SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { TimeSheet } from "../../../timeSheet/entities/timeSheet.entity";

export type timeSheetDocument = HydratedDocument<TimeSheet>

export const timeSheetSchema = SchemaFactory.createForClass(TimeSheet)
