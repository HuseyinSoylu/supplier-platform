import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  supplier_id: number;

  @Column({ length: 100 })
  supplier_short_name: string;

  @Column({ length: 255 })
  supplier_long_name: string;
}
