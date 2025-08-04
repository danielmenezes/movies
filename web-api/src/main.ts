import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  const host = '0.0.0.0';

  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('API Entregas')
      .setDescription('')
      .setVersion('1.0')
      .addTag('API')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/swagger', app, document);
  }

  app.enableCors({
    // origin: 'http://localhost:5173',

    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(port, host);
}
bootstrap();
