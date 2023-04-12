import { Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { TimeSheet } from "../entities/time-sheet.entity";

export class TimeSheetRepository {
    constructor(
        @Inject('TIME_SHEET_REPOSITORY')
        private repo: Repository<TimeSheet>
    ) {}

    async getSheetByMonth (month: string): Promise<TimeSheet> {
        return this.repo.findOneBy({month})
    }

    
}
