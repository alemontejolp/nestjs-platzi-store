import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Input data validation in endpoints
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }))
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector))) // Para usar los class-transformers
  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Platzi Store')
    .setDescription('The Platzi Store API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  // CORS
  app.enableCors()
  // Start app
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
