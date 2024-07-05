// suppliers.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './suppliers.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async findAll(): Promise<Supplier[]> {
    return this.supplierRepository.find();
  }

  async findOne(id: number): Promise<Supplier> {
    return this.supplierRepository.findOne({
      where: {
        supplier_id: id,
      },
    });
  }

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const newSupplier = this.supplierRepository.create(createSupplierDto);
    return this.supplierRepository.save(newSupplier);
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto): Promise<Supplier> {
    const supplierToUpdate = await this.supplierRepository.findOne({
      where: {
        supplier_id: id,
      },
    });
    if (!supplierToUpdate) {
      throw new Error(`Supplier with ID ${id} not found.`);
    }

    const updatedSupplier = Object.assign(supplierToUpdate, updateSupplierDto);
    return this.supplierRepository.save(updatedSupplier);
  }

  async remove(id: number): Promise<void> {
    await this.supplierRepository.delete(id);
  }
}
