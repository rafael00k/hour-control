import { CreateEntryOutputDTO } from "src/dayEntry/dto/createEntry.output.dto"

export class TimeSheetOutputDTO {
    mes: string
    horasTrabalhadas: string
    horasExcedentes: string
    horasDevidas: string
    registros: CreateEntryOutputDTO[]  
}
