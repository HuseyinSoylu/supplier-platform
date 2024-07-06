import { Controller, Post } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('generateData')
@ApiTags('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post() // Defines a POST endpoint at the base path ('generateData')
  async generateDummyData() {
    return this.seederService.generateDummyData();
  }
}
