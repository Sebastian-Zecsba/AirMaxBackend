import { Controller, Get, Post, Body, Param, Delete, Query, Put, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsQueryDTO } from '../products/dto/get-product.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageService } from 'src/upload-image/upload-image.service';

@Controller('products')
export class ProductsController {
  constructor(
      private readonly productsService: ProductsService,
      private readonly uploadImageService : UploadImageService
    ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() query: GetProductsQueryDTO) {

    const take = query.take ? query.take : 8
    const skip = query.skip ? query.skip : 0
    const search = query.search
    return this.productsService.findAll(take, skip, search);
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.productsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id', IdValidationPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Put('updatedShow/:id')
  updateShow(@Param('id', IdValidationPipe) id: string, @Body() updateProductDto : UpdateProductDto){
    return this.productsService.updateShow(+id, updateProductDto)
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.productsService.remove(+id);
  }

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File){
    if(!file){
      throw new BadRequestException('La imagen es obligatoria')
    }
    return this.uploadImageService.uploadFile(file)
  }
}
