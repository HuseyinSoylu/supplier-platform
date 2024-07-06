import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { Product } from '../products/product.entity';
import { Supplier } from '../suppliers/suppliers.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find();
  }

  async findOne(vehicleId: number): Promise<Vehicle> {
    return this.vehicleRepository.findOne({
      where: {
        vehicle_id: vehicleId,
      },
    });
  }

  async findVehiclesByRegion(region: string): Promise<Vehicle[]> {
    return this.vehicleRepository.find({
      where: {
        production_region: region,
      },
    });
  }
  async findVehiclesWithDetails(filters: any): Promise<any[]> {
    const vehiclesQuery = this.vehicleRepository
      .createQueryBuilder('vehicle')
      .leftJoinAndSelect('vehicle.products', 'product')
      .leftJoinAndSelect('product.supplier', 'supplier');

    // Apply filters dynamically
    for (const key in filters) {
      if (filters[key]) {
        vehiclesQuery.andWhere(`vehicle.${key} = :${key}`, {
          [key]: filters[key],
        });
      }
    }

    const vehicles = await vehiclesQuery.getMany();
    return vehicles.map((vehicle) => ({
      ...vehicle,
      products: vehicle.products.map((product) => ({
        ...product,
        supplier: product.supplier,
      })),
    }));
  }

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const newVehicle = this.vehicleRepository.create(createVehicleDto);
    return this.vehicleRepository.save(newVehicle);
  }

  async update(
    vehicleId: number,
    updateVehicleDto: CreateVehicleDto,
  ): Promise<Vehicle> {
    const vehicleToUpdate = await this.vehicleRepository.findOne({
      where: {
        vehicle_id: vehicleId,
      },
    });
    if (!vehicleToUpdate) {
      throw new Error(`Vehicle with ID ${vehicleId} not found.`);
    }

    const updatedVehicle = Object.assign(vehicleToUpdate, updateVehicleDto);
    return this.vehicleRepository.save(updatedVehicle);
  }

  async remove(vehicleId: number): Promise<void> {
    await this.vehicleRepository.delete(vehicleId);
  }
}
