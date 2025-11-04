import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';
import { AttendanceAnalysisDto } from '../dto/analysis-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private service: AttendanceService) {}

  @Post()
  record(@Body() dto: CreateAttendanceDto) {
    return this.service.record(dto);
  }

  @Get(':userId')
  history(@Param('userId', ParseIntPipe) userId: number) {
    return this.service.history(userId);
  }

  @Post('analysis')
  analyze(@Body() dto: AttendanceAnalysisDto) {
    return this.service.analyze(dto);
  }
}
