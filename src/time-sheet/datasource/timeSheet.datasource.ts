import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TimeSheet } from "../entities/timeSheet.entity";
@Injectable()
export class TimeSheetDataSource {
    constructor(@InjectModel(TimeSheet.name) private timeSheetModel: Model<TimeSheet>) { }
    async create(month: string): Promise<TimeSheet> {
        return this.timeSheetModel.create({
            month
        })
    }

    async findByMonth(month: string): Promise<TimeSheet> {
        return this.timeSheetModel.findOne({month}).exec()
    }
}
