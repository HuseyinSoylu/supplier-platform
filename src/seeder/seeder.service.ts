import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../vehicles/vehicle.entity';
import { Supplier } from '../suppliers/suppliers.entity';
import { Product } from '../products/product.entity';
import productsData from '../data/productsData';
import vehiclesData from 'src/data/vehiclesData';
import suppliersData from 'src/data/suppliersData';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async seedData() {
    try {
      await this.seedVehicles();
      await this.seedSuppliers();
      await this.seedProducts();
      console.log('Dummy data seeded successfully.');
    } catch (error) {
      console.error('Error seeding dummy data:', error);
    }
  }

  async seedVehicles() {
    const vehiclesToCreate = vehiclesData.map((data) => {
      const vehicle = new Vehicle();
      vehicle.id_oem = data.id_oem;
      vehicle.oem_origin = data.oem_origin;
      vehicle.production_region = data.production_region;
      vehicle.maker = data.maker;
      vehicle.brand = data.brand;
      vehicle.model = data.model;
      vehicle.vehicle_type = data.vehicle_type;
      vehicle.propulsion = data.propulsion;
      vehicle.propulsion_type = data.propulsion_type;
      vehicle.vehicle_production_country = data.vehicle_production_country;
      vehicle.model_year = data.model_year;
      return vehicle;
    });

    await this.vehicleRepository.save(vehiclesToCreate);
  }

  async seedSuppliers() {
    const suppliersToCreate = suppliersData.map((data) => {
      const supplier = new Supplier();
      supplier.supplier_short_name = data.supplier_short_name;
      supplier.supplier_long_name = data.supplier_long_name;
      return supplier;
    });

    await this.supplierRepository.save(suppliersToCreate);
  }

  async seedProducts() {
    const productsToCreate = await Promise.all(
      productsData.map(async (data) => {
        const product = new Product();
        product.l0 = data.l0;
        product.l1 = data.l1;
        product.component_category_l2 = data.component_category_l2;
        product.l3_product = data.l3_product;
        product.in_parenthesis_l4 = data.in_parenthesis_l4;
        product.vehicle = await this.vehicleRepository.findOne({
          where: { vehicle_id: data.vehicle_id },
        });
        product.supplier = await this.supplierRepository.findOne({
          where: { supplier_id: data.supplier_id },
        });
        return product;
      }),
    );

    await this.productRepository.save(productsToCreate);
  }

  async generateDummyData() {
    await this.seedData();
    return { message: 'Dummy data generated successfully' };
  }
}
