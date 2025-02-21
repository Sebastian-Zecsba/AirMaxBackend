import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

const port = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  app.enableCors({
    origin: '*', // Permite cualquier origen (NO recomendado en producción)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  })
  app.useStaticAssets(join(__dirname, '../public'))
  await app.listen(port);
}
bootstrap();
