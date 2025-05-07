import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

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

  // Method to fetch reservations with arrival date filtering
  async getReservations(startDate: string, endDate: string): Promise<any> {
    const token = await this.getAccessToken();

    const params = {
      'arrival[gte]': startDate, // arrival greater than or equal to startDate
      'arrival[lte]': endDate, // arrival less than or equal to endDate
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
