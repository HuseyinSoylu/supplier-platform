import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { ProductsModule } from './products/products.module';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.TYPEORM_USERNAME || 'postgres',
      password: process.env.TYPEORM_PASSWORD || 'postgres',
      database: process.env.TYPEORM_DATABASE || 'test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    VehiclesModule,
    SuppliersModule,
    ProductsModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
