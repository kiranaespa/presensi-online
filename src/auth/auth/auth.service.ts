// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
// import { randomBytes } from 'crypto';

// @Injectable()
// export class AuthService {
//   constructor(private prisma: PrismaService) {}

//   async login(username: string, password: string) {
//     const user = await this.prisma.user.findUnique({ where: { username } });

//     if (!user) throw new UnauthorizedException('Username tidak ditemukan');
//     if (user.password !== password) throw new UnauthorizedException('Password salah');

//     // generate token random
//     const token = randomBytes(32).toString('hex');

//     // simpan token ke database
//     await this.prisma.user.update({
//       where: { username },
//       data: { token },
//     });

//     return { token };
//   }
// }
