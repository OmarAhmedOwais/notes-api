import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { setupSwagger } from './common/utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  setupSwagger(app);

  app.useGlobalInterceptors(new TimeoutInterceptor());
  await app.listen(app.get(ConfigService).get('PORT'));
}
bootstrap();
