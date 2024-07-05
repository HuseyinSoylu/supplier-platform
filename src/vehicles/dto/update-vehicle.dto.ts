import { ApiProperty } from '@nestjs/swagger';

export class UpdateVehicleDto {
  @ApiProperty({ example: '1234', description: 'OEM ID' })
  readonly id_oem: string;

  @ApiProperty({ example: 'Origin', description: 'OEM origin' })
  readonly oem_origin: string;

  @ApiProperty({ example: 'Region', description: 'Production region' })
  readonly production_region: string;

  @ApiProperty({ example: 'Maker', description: 'Maker' })
  readonly maker: string;

  @ApiProperty({ example: 'Brand', description: 'Brand' })
  readonly brand: string;

  @ApiProperty({ example: 'Model', description: 'Model' })
  readonly model: string;

  @ApiProperty({ example: 'Car', description: 'Vehicle type' })
  readonly vehicle_type: string;

  @ApiProperty({ example: 'Gasoline', description: 'Propulsion' })
  readonly propulsion: string;

  @ApiProperty({ example: 'Automatic', description: 'Propulsion type' })
  readonly propulsion_type: string;

  @ApiProperty({ example: 'Country', description: 'Vehicle production country' })
  readonly vehicle_production_country: string;

  @ApiProperty({ example: 2024, description: 'Model year' })
  readonly model_year: number;
}
