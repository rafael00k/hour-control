import { DataSource } from "typeorm";
import { TimeSheet } from "./entities/time-sheet.entity";

export const timeSheetProviders = [
    {
      provide: 'TIME_SHEET_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(TimeSheet),
      inject: ['DATA_SOURCE'],
    },
  ];
  