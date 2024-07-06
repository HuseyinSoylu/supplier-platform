import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from '../products/product.entity';
@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  vehicle_id: number;

  @Column()
  id_oem: string;

  @Column()
  oem_origin: string;

  @Column()
  production_region: string;

  @Column()
  maker: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  vehicle_type: string;

  @Column()
  propulsion: string;

  @Column()
  propulsion_type: string;

  @Column()
  vehicle_production_country: string;

  @Column()
  model_year: number;

  @OneToMany(() => Product, (product) => product.vehicle)
  products: Product[];
}
