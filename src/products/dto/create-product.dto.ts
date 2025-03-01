import { ArrayMinSize, IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty({message: 'El nombre del producto es Obligatorio'})
    @IsString({message: 'Nombre no valido'})
    name: string

    @IsNotEmpty({message: 'La descripcion es obligatoria'})
    @IsString({message: 'Descripcion no valida'})
    description: string

    @IsNotEmpty({ message: 'Al menos una imagen es obligatoria' })
    @IsArray({ message: 'Las imágenes deben ser un arreglo' })
    @IsString({ each: true, message: 'Cada imagen debe ser una cadena válida' })
    @ArrayMinSize(1, { message: 'Debe haber al menos una imagen' })
    images: string[]; // Cambiado a un arreglo de strings

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
