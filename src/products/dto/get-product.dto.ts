import { IsNumberString, IsOptional, IsString } from 'class-validator'

export class GetProductsQueryDTO {
    @IsOptional()
    @IsNumberString({}, {message: 'La categoria debe ser un numero'})
    category_id? : number

    @IsOptional()
    @IsNumberString({}, {message: 'La cantidad debe ser un numero'})
    take: number

    @IsOptional()
    @IsNumberString({}, {message: 'La cantidad debe ser un numero'})
    skip: number
    
    @IsOptional()
    @IsString({message: 'Error de busqueda'})
    search: string
}