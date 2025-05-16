import { IsDateString, IsNotEmpty, IsDefined } from 'class-validator';

export class ChampagneAllocationsQueryDto {
  @IsDefined({ message: 'startDate is required' })
  @IsNotEmpty({ message: 'startDate should not be empty' })
  @IsDateString({}, { message: 'startDate must be a valid ISO date string' })
  startDate: string;

  @IsDefined({ message: 'endDate is required' })
  @IsNotEmpty({ message: 'endDate should not be empty' })
  @IsDateString({}, { message: 'endDate must be a valid ISO date string' })
  endDate: string;
}
