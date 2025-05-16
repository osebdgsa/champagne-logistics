import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChampagneService } from './champagne.service';
import { ChampagneAllocationReponseDto } from './dto/champagne-allocation-reponse.dto';
import { ChampagneAllocationsQueryDto } from './dto/champagne-allocations-query.dto';

@Controller('champagne-logistics')
export class ChampagneController {
  constructor(private readonly champagneService: ChampagneService) {}

  // Endpoint property champagne allocations for a specific date range
  @Get('champagne-allocations')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async getReservations(
    @Query() query: ChampagneAllocationsQueryDto,
  ): Promise<ChampagneAllocationReponseDto> {
    return this.champagneService.computeChampagneBottlesPerProperty(query);
  }
}
