import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty()
  @IsString()
  readonly id_oem: string;

  @ApiProperty()
  @IsString()
  readonly oem_origin: string;

  @ApiProperty()
  @IsString()
  readonly production_region: string;

  @ApiProperty()
  @IsString()
  readonly maker: string;

  @ApiProperty()
  @IsString()
  readonly brand: string;

  @ApiProperty()
  @IsString()
  readonly model: string;

  @ApiProperty()
  @IsString()
  readonly vehicle_type: string;

  @ApiProperty()
  @IsString()
  readonly propulsion: string;

  @ApiProperty()
  @IsString()
  readonly propulsion_type: string;

  @ApiProperty()
  @IsString()
  readonly vehicle_production_country: string;

  @ApiProperty()
  @IsInt()
  readonly model_year: number;
}
