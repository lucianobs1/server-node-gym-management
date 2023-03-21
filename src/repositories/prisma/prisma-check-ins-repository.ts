import { prisma } from '@/lib/prisma';
import { Prisma, CheckIn } from '@prisma/client';
import { CheckInsRepository } from '../check-ins-repository';

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }

  async save(checkInData: CheckIn): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: checkInData.id,
      },
      data: checkInData,
    });

    return checkIn;
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    });

    return checkIn;
  }
  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return checkIns;
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    throw new Error('Method not implemented.');
  }
  async countByUserId(userId: string): Promise<number> {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });

    return count;
  }
}