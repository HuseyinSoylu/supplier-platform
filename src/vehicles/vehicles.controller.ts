import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from './vehicle.entity';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  async findAll(): Promise<Vehicle[]> {
    return this.vehiclesService.findAll();
  }

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return this.vehiclesService.create(createVehicleDto);
  }
}
