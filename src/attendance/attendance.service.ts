import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';
import { AttendanceAnalysisDto } from '../dto/analysis-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async record(dto: CreateAttendanceDto) {
    const date = new Date(dto.date);
    date.setHours(0, 0, 0, 0);

    const exists = await this.prisma.attendance.findUnique({
      where: { userId_date: { userId: dto.userId, date } },
    });

    if (exists) throw new BadRequestException('Attendance already recorded');

    return this.prisma.attendance.create({
      data: { ...dto, date },
    });
  }

  async history(userId: number) {
    return this.prisma.attendance.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }

  async analyze(dto: AttendanceAnalysisDto) {
  const users = dto.userIds?.length
    ? dto.userIds
    : (await this.prisma.user.findMany()).map(u => u.id);

  const result: {
    userId: number;
    total: number;
    present: number;
    percent: number;
  }[] = []; // <-- Type Array-nya didefinisikan

  for (const id of users) {
    const records = await this.prisma.attendance.findMany({
      where: {
        userId: id,
        date: {
          gte: new Date(dto.startDate),
          lte: new Date(dto.endDate),
        },
      },
    });

    const present = records.filter(r => r.status === 'present').length;

    result.push({
      userId: id,
      total: records.length,
      present,
      percent: records.length ? (present / records.length) * 100 : 0,
    });
  }

  return result;
}
}