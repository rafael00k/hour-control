import { IsDateString } from "class-validator";

export class CreateEntryInputDto {
    @IsDateString({strict: true},{message: 'Data e hora em formato inválido'})
    dataHora: string
}
