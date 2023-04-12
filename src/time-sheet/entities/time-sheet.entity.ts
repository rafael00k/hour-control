import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { TimeSheetDayEntry } from "./time-sheet-day-entry.entity"

@Entity()
export class TimeSheet {
    @PrimaryColumn({type: 'string'})
    month: string

    @OneToMany(() => TimeSheetDayEntry, (entry) => entry.timeSheet,{eager: true})
    entrys: TimeSheetDayEntry[] 
}
