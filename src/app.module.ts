import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesController } from './vehicles/vehicles.controller';
import { Vehicle } from './vehicles/vehicle.entity';
import { VehiclesService } from './vehicles/vehicles.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.TYPEORM_USERNAME || 'postgres',
      password: process.env.TYPEORM_PASSWORD || 'postgres',
      database: process.env.TYPEORM_DATABASE || 'test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Vehicle]),
  ],
  controllers: [AppController, VehiclesController],
  providers: [AppService, VehiclesService],
  exports: [VehiclesService],
})
export class AppModule {}
