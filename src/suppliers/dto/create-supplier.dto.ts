import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty()
  @IsString()
  @Length(1, 100)
  readonly supplier_short_name: string;

  @ApiProperty()
  @IsString()
  @Length(1, 255)
  readonly supplier_long_name: string;
}
