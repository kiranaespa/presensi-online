import { IsNumber, IsDateString, IsEnum, IsOptional } from 'class-validator';

export class CreateAttendanceDto {
  @IsNumber()
  userId: number;

  @IsDateString()
  date: string; // contoh: "2025-11-03"

  @IsEnum(['present', 'absent', 'late', 'sick'])
  status: string;

  @IsOptional()
  note?: string;
}
