import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { TimeSheet } from "./time-sheet.entity"

@Entity()
export class TimeSheetDayEntry {
    @PrimaryColumn({type: 'string'})
    day: string

    @Column({type: 'timestamptz',array: true })
    hours: Date[]

    @ManyToOne(() => TimeSheet, (timeSheet) => timeSheet.entrys)
    timeSheet: TimeSheet
}
