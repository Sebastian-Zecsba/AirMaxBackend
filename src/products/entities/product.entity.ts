import { Category } from "../../categories/entities/category.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 60})
    name: string

    @Column({type: 'text'})
    description: string

    @Column({type: 'varchar', length: 120, nullable: true, default: 'default.png'})
    image: string

    @Column({type: 'float'})
    price: number

    @Column({type: 'boolean', default: false})
    show: boolean

    @ManyToOne(() => Category)
    category: Category

    @Column({type: 'int'})
    categoryId: number
}
