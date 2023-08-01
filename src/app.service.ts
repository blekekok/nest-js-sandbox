import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async findStars() {
    const chance = Math.floor(Math.random() * 100);
    const newStar = chance <= 50;

    const totalStars = Math.floor(Math.random() * 1000);
    const hash = uuid();

    if (newStar) {
      try {
        await this.prisma.star.create({
          data: {
            amount: totalStars,
            hash,
          },
        });
      } catch (e) {
        console.log(e);
      }
    }

    const biggestStars = await this.prisma.star.findMany({
      orderBy: [
        {
          amount: 'desc',
        },
      ],
      take: 10,
    });

    return {
      newStar,
      message: newStar
        ? `You've found a new star, Congratulations`
        : `You haven't discovered any new stars, shucks.`,
      biggestStars,
      hash,
    };
  }
}
