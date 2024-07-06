import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesController } from './vehicles/vehicles.controller';
import { Vehicle } from './vehicles/vehicle.entity';
import { Supplier } from './suppliers/suppliers.entity';
import { VehiclesService } from './vehicles/vehicles.service';
import { SuppliersController } from './suppliers/suppliers.controller';
import { SuppliersService } from './suppliers/suppliers.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { Product } from './products/product.entity';

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
    TypeOrmModule.forFeature([Vehicle, Supplier, Product]),
  ],
  controllers: [
    AppController,
    VehiclesController,
    SuppliersController,
    ProductsController,
  ],
  providers: [AppService, VehiclesService, SuppliersService, ProductsService],
  exports: [VehiclesService, SuppliersService, ProductsService],
})
export class AppModule {}
