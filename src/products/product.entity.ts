import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Vehicle } from '../vehicles/vehicle.entity';
import { Supplier } from '../suppliers/suppliers.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column({ length: 100 })
  l0: string;

  @Column({ length: 100 })
  l1: string;

  @Column({ length: 100 })
  component_category_l2: string;

  @Column({ length: 255 })
  l3_product: string;

  @Column({ length: 255 })
  in_parenthesis_l4: string;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.products)
  vehicle: Vehicle;

  @ManyToOne(() => Supplier, (supplier) => supplier.products)
  supplier: Supplier;
}
