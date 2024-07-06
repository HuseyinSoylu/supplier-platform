import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ example: 'L0 Value', description: 'L0 level value' })
  @IsString()
  readonly l0: string;

  @ApiProperty({ example: 'L1 Value', description: 'L1 level value' })
  @IsString()
  readonly l1: string;

  @ApiProperty({ example: 'Component Category', description: 'Component category L2' })
  @IsString()
  readonly component_category_l2: string;

  @ApiProperty({ example: 'L3 Product Value', description: 'L3 product value' })
  @IsString()
  readonly l3_product: string;

  @ApiProperty({ example: 'In Parenthesis Value', description: 'In parenthesis L4' })
  @IsString()
  readonly in_parenthesis_l4: string;

  @ApiProperty({ example: 1, description: 'Vehicle ID' })
  @IsInt()
  readonly vehicle_id: number;

  @ApiProperty({ example: 1, description: 'Supplier ID' })
  @IsInt()
  readonly supplier_id: number;
}
