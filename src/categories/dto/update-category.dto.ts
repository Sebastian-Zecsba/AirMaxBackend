import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsDefined, IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @IsDefined({message: 'El nombre es obligatorio'})
    @IsNotEmpty({message: 'El nombre de la categoria no puede ir vacia'})
    name: string
}
