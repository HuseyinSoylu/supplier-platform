// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Product } from './product.entity';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';

// @Injectable()
// export class ProductsService {
//   constructor(
//     @InjectRepository(Product)
//     private readonly productRepository: Repository<Product>,
//   ) {}

//   async findAll(): Promise<Product[]> {
//     return this.productRepository.find({ relations: ['vehicle', 'supplier'] });
//   }

//   async findOne(id: number): Promise<Product> {
//     return this.productRepository.findOne({
//       where: { product_id: id },
//       relations: ['vehicle', 'supplier'],
//     });
//   }

//   async create(createProductDto: CreateProductDto): Promise<Product> {
//     const newProduct = this.productRepository.create(createProductDto);
//     return this.productRepository.save(newProduct);
//   }

//   async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
//     const productToUpdate = await this.productRepository.findOne({
//       where: {
//         product_id: id,
//       },
//     });
//     if (!productToUpdate) {
//       throw new Error(`Product with ID ${id} not found.`);
//     }

//     const updatedProduct = Object.assign(productToUpdate, updateProductDto);
//     return this.productRepository.save(updatedProduct);
//   }

//   async remove(id: number): Promise<void> {
//     await this.productRepository.delete(id);
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Vehicle } from '../vehicles/vehicle.entity';
import { Supplier } from '../suppliers/suppliers.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['vehicle', 'supplier'] });
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { product_id: id },
      relations: ['vehicle', 'supplier'],
    });
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const vehicle = await this.vehicleRepository.findOne({ where: { vehicle_id: createProductDto.vehicle_id } });
    const supplier = await this.supplierRepository.findOne({ where: { supplier_id: createProductDto.supplier_id } });

    if (!vehicle || !supplier) {
      throw new Error('Vehicle or Supplier not found');
    }

    const newProduct = this.productRepository.create({
      ...createProductDto,
      vehicle,
      supplier,
    });

    return this.productRepository.save(newProduct);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const productToUpdate = await this.productRepository.findOne({ where: { product_id: id } });
    if (!productToUpdate) {
      throw new Error(`Product with ID ${id} not found.`);
    }

    const vehicle = await this.vehicleRepository.findOne({ where: { vehicle_id: updateProductDto.vehicle_id } });
    const supplier = await this.supplierRepository.findOne({ where: { supplier_id: updateProductDto.supplier_id } });

    if (!vehicle || !supplier) {
      throw new Error('Vehicle or Supplier not found');
    }

    const updatedProduct = Object.assign(productToUpdate, {
      ...updateProductDto,
      vehicle,
      supplier,
    });

    return this.productRepository.save(updatedProduct);
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
