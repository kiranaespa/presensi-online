import { IsDateString, IsOptional, IsArray } from 'class-validator';

export class AttendanceAnalysisDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsArray()
  userIds?: number[];
}
