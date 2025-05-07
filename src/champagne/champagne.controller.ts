import { Controller, Get, Query } from '@nestjs/common';
import { ChampagneService } from './champagne.service';

@Controller('champagne-logistics')
export class ChampagneController {
  constructor(private readonly champagneService: ChampagneService) {}

  // Endpoint to get reservations for a specific date range
  @Get('vip-reservations')
  async getReservations(
    @Query('startDate') startDate: string, // Start date query parameter
    @Query('endDate') endDate: string, // End date query parameter
  ): Promise<any> {
    if (!startDate || !endDate) {
      throw new Error('Both startDate and endDate are required');
    }

    // Call the service method to fetch reservations
    const reservations: any = await this.champagneService.getReservations(
      startDate,
      endDate,
    );
    return reservations; // Return the fetched reservations
  }
}
