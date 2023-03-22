import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { FetchNearbyGymsCase } from '../fetch-nearby-gyms-use-case';

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymsCase(gymsRepository);

  return useCase;
}
