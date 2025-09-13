/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call*/
/* eslint-disable prettier/prettier*/
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config: OpenAPIObject = new DocumentBuilder()
    .setTitle('Medieval Script')
    .setDescription('The Medieval API description')
    .setVersion('0.1')
    .build() as OpenAPIObject;
  
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api',app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

