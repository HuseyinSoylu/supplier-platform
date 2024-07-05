export class CreateVehicleDto {
    readonly id_oem: string;
    readonly oem_origin: string;
    readonly production_region: string;
    readonly maker: string;
    readonly brand: string;
    readonly model: string;
    readonly vehicle_type: string;
    readonly propulsion: string;
    readonly propulsion_type: string;
    readonly vehicle_production_country: string;
    readonly model_year: number;
}