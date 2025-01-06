import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AdminUserSeeder } from './admin-user.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seeder = app.get(AdminUserSeeder);
  await seeder.seed();
  await app.close();
}

bootstrap();
