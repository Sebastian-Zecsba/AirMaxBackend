import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty({message: 'El nombre del producto es Obligatorio'})
    @IsString({message: 'Nombre no valido'})
    name: string

    @IsNotEmpty({message: 'La descripcion es obligatoria'})
    @IsString({message: 'Descripcion no valida'})
    description: string

    @IsNotEmpty({message: 'La imagen del producto es obligatoria'})
    image: string

    @IsNotEmpty({message: 'El precio del producto es Obligatorio'})
    @IsNumber({}, { message: 'Precio no valido'})
    price: number

    @IsOptional()
    @IsBoolean()
    show: boolean = false

    @IsNotEmpty({message: 'Categoria es obligatoria'})
    @IsInt({message: 'La categoria no es valida'})
    categoryId: number
}
