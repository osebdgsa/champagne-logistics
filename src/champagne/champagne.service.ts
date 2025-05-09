import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ReservationDto } from './dto';

@Injectable()
export class ChampagneService {
  private readonly tokenUrl: string;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly baseApiUrl: string;

  constructor(private readonly configService: ConfigService) {
    // Initialize readonly variables after configService is available
    this.tokenUrl = this.configService.get<string>('TOKEN_URL') || '';
    this.clientId = this.configService.get<string>('CLIENT_ID') || '';
    this.clientSecret = this.configService.get<string>('CLIENT_SECRET') || '';
    this.baseApiUrl = this.configService.get<string>('API_BASE_URL') || '';
  }

  // Method to fetch the access token
  async getAccessToken(): Promise<string> {
    if (!this.tokenUrl || !this.clientId || !this.clientSecret) {
      throw new Error(
        'Missing configuration values for OAuth2 (TOKEN_URL, CLIENT_ID, CLIENT_SECRET)',
      );
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', this.clientId);
    params.append('client_secret', this.clientSecret);

    try {
      const response = await axios.post(this.tokenUrl, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      return response.data.access_token; // Just return the access token
    } catch (error) {
      console.error('Error fetching access token:', error);
      throw new Error('Failed to fetch access token');
    }
  }

  async computeChampagneBottlesPerProperty({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }): Promise<Record<string, number>> {
    const limit = 1000;
    let offset = 0;
    const propertyChampagneCounts: Record<string, number> = {};

    while (true) {
      const data = await this.getReservations({
        startDate,
        endDate,
        limit,
        offset,
      });
      const reservations: ReservationDto[] = data?.data?.data;

      if (!reservations || reservations.length === 0) {
        break; // no more data
      }

      // Process each reservation in the current batch
      for (const reservation of reservations) {
        if (reservation.vip) {
          const propertyName: string =
            reservation?.['propertyId'] || 'UnknownProperty';
          // Increment count for this property
          propertyChampagneCounts[propertyName] =
            (propertyChampagneCounts[propertyName] || 0) + 1;
        }
      }

      offset += limit; // prepare for next batch
    }

    return propertyChampagneCounts;
  }

  // Method to fetch reservations with arrival date filtering
  async getReservations({
    startDate,
    endDate,
    limit,
    offset,
  }: {
    startDate: string;
    endDate: string;
    limit: number;
    offset: number;
  }): Promise<any> {
    const token = await this.getAccessToken();

    const params = {
      'arrival[gte]': startDate, // arrival greater than or equal to startDate
      'arrival[lte]': endDate, // arrival less than or equal to endDate
      limit: limit,
      offset: offset,
    };

    try {
      const response = await axios.get(
        `${this.baseApiUrl}/api/v2/reservations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
            'source-id': 'SWAGGER-API-CALL',
          },
          params, // Add dynamic query parameters for arrival date range
        },
      );

      return response.data; // Return the reservation data
    } catch (error) {
      console.error('Error fetching reservations:', error);
      throw new Error('Failed to fetch reservations');
    }
  }
}
