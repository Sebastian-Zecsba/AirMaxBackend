import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductsModule } from './products/products.module';
import { UploadImageService } from './upload-image/upload-image.service';
import { UploadImageModule } from './upload-image/upload-image.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  TypeOrmModule.forRootAsync({
    useFactory: typeOrmConfig,
    inject: [ConfigService]
  }),
  CategoriesModule,
  ProductsModule,
  UploadImageModule
],
  controllers: [AppController],
  providers: [AppService, UploadImageService],
})
export class AppModule {}
