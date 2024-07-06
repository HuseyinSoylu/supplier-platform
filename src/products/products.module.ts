import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { Vehicle } from '../vehicles/vehicle.entity';
import { Supplier } from '../suppliers/suppliers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Vehicle, Supplier])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
