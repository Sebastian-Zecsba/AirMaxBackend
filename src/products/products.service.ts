import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
  ){}

  async create(createProductDto: CreateProductDto) {

    const category = await this.categoryRepository.findOneBy({id: createProductDto.categoryId})
    if(!category){
      let errors : string[] = []
      errors.push('La Categoria no existe')
      throw new NotFoundException(errors)
    }

    return this.productRepository.save({
      ...createProductDto,
      category
    })
  }

  async findAll(take: number, skip: number, search: string) {

    const options : FindManyOptions<Product> | undefined = {
      relations: {
        category: true
      },
      order: {
        id: 'desc'
      },
      take: take,
      skip: skip
    } 

    if(search){
      options.where = {
        name: ILike(`%${search}%`)
      }
    }

    const [products, total] = await this.productRepository.findAndCount(options)
    return {
      products,
      total
    };
  }

  async findOne(id: number) {

    const product = await this.productRepository.findOne({
      where: {
        id: id
      },
      relations: {
        category: true
      }
    })

    if(!product){
      throw new NotFoundException(`El producto con el ID: ${id} no fue encontrado`)
    } 

    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id)
    Object.assign(product, updateProductDto)

    if(updateProductDto.categoryId){
      const category = await this.categoryRepository.findOneBy({id: updateProductDto.categoryId})
      if(!category){
        let errors : string[] = []
        errors.push('La Categoria no existe')
        throw new NotFoundException(errors)
      }
      product.category = category
    }

    return await this.productRepository.save(product)
  }

  async updateShow(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id)
    Object.assign(product, updateProductDto)

    if(updateProductDto.categoryId){
      const category = await this.categoryRepository.findOneBy({id: updateProductDto.categoryId})
      if(!category){
        let errors : string[] = []
        errors.push('La Categoria no existe')
        throw new NotFoundException(errors)
      }
      product.category = category
    }

    return await this.productRepository.save(product)
  }

  async remove(id: number) {
    const product = await this.findOne(id)
    await this.productRepository.remove(product)

    return {
      message: `Producto eliminado`
    };
  }
}
