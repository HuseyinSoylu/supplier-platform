import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  supplier_id: number;

  @Column({ type: 'varchar', length: 100 })
  supplier_short_name: string;

  @Column({ type: 'varchar', length: 255 })
  supplier_long_name: string;

  @OneToMany(() => Product, (product) => product.supplier)
  products: Product[];
}
