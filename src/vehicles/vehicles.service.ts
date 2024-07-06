import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
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
