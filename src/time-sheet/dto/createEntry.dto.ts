import { IsDateString } from "class-validator";

export class CreateEntryDto {
    @IsDateString({strict: true},{message: 'Data e hora em formato inválido'})
    dataHora: Date
}
