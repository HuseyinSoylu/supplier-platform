import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';

async function bootstrap() {
  dotenvConfig({ path: join(__dirname, '..', '.env') });

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Suppliers API')
    .setDescription('Api documentation for suppliers')
    .setVersion('1.0')
    .addTag('supply-bridge')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  await TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'postgres',
      host: configService.get<string>('TYPEORM_HOST'),
      port: configService.get<number>('TYPEORM_PORT'),
      username: configService.get<string>('TYPEORM_USERNAME'),
      password: configService.get<string>('TYPEORM_PASSWORD'),
      database: configService.get<string>('TYPEORM_DATABASE'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: configService.get<boolean>('TYPEORM_SYNCHRONIZE', true),
    }),
  });
}
bootstrap();
