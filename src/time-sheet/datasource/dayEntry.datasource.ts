import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model,model } from "mongoose";
import { DayEntry } from "../entities/dayEntry.entity";
import { TimeSheet } from "../entities/timeSheet.entity";

@Injectable()
export class DayEntryDataSource {
    constructor(@InjectModel(DayEntry.name) private dayEntryModel: Model<DayEntry>) {}

    async findDayEntryByDay(day: string): Promise<DayEntry> {
       return this.dayEntryModel.findOne({day}).exec() 
    }

    async findDayEntrysByTimeSheet(timeSheet: TimeSheet): Promise<DayEntry[]> {
        return this.dayEntryModel.find({timeSheet})
    }

    async addEntry(day: string, entry: Date): Promise<DayEntry> {
        const dayEntry = await this.dayEntryModel.findOne({day})
        dayEntry.hours.push(entry)
        return dayEntry.save()    
    }

    async create(day: string, entry: Date, timeSheet: TimeSheet ): Promise<DayEntry> {
        return this.dayEntryModel.create({
            day,
            hours: [entry],
            timeSheet
          })
    }

}
