import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './vehicle.entity';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  async findAll(): Promise<Vehicle[]> {
    return this.vehiclesService.findAll();
  }

  @Get('search')
  @ApiQuery({ name: 'id_oem', required: false })
  @ApiQuery({ name: 'oem_origin', required: false })
  @ApiQuery({ name: 'production_region', required: false })
  @ApiQuery({ name: 'maker', required: false })
  @ApiQuery({ name: 'brand', required: false })
  @ApiQuery({ name: 'model', required: false })
  @ApiQuery({ name: 'vehicle_type', required: false })
  @ApiQuery({ name: 'propulsion_type', required: false })
  @ApiQuery({ name: 'model_year', required: false, type: Number })
  async searchVehicles(
    @Query('id_oem') id_oem?: string,
    @Query('oem_origin') oem_origin?: string,
    @Query('production_region') production_region?: string,
    @Query('maker') maker?: string,
    @Query('brand') brand?: string,
    @Query('model') model?: string,
    @Query('vehicle_type') vehicle_type?: string,
    @Query('propulsion_type') propulsion_type?: string,
    @Query('model_year') model_year?: number,
  ) {
    const filters = {
      id_oem,
      oem_origin,
      production_region,
      maker,
      brand,
      model,
      vehicle_type,
      propulsion_type,
      model_year,
    };

    // Remove undefined properties from filters object
    Object.keys(filters).forEach(
      (key) => filters[key] === undefined && delete filters[key],
    );

    return this.vehiclesService.findVehiclesWithDetails(filters);
  }

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.vehiclesService.remove(id);
  }
}
