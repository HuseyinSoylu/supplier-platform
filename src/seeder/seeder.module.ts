import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';
import { Vehicle } from '../vehicles/vehicle.entity';
import { Product } from 'src/products/product.entity';
import { Supplier } from 'src/suppliers/suppliers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Product, Supplier])],
  controllers: [SeederController],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
