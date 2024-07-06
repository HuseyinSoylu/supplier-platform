import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './vehicle.entity';
import { Product } from 'src/products/product.entity';
import { Supplier } from 'src/suppliers/suppliers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Product, Supplier])],
  controllers: [VehiclesController],
  providers: [VehiclesService],
  exports: [VehiclesService],
})
export class VehiclesModule {}
