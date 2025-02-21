import { IsDefined, IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
    @IsDefined({message: 'El nombre es obligatorio'})
    @IsNotEmpty({message: 'El nombre de la categoria no puede ir vacia'})
    name: string    
}
