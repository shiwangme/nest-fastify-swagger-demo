import { resolve } from 'path';
import { writeFileSync } from 'fs';

import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth()
    .build();
  // 生成的 JSON 格式文档，可以导出静态化
  const document = SwaggerModule.createDocument(app, options);
  writeFileSync(resolve(__dirname, '../api.json'), JSON.stringify(document, null, 2), { encoding: 'utf8' });
}
bootstrap();
