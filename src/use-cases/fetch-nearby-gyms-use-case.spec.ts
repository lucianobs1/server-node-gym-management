import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { FetchNearbyGymsCase } from './fetch-nearby-gyms-use-case';

let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsCase;

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsCase(inMemoryGymsRepository);
  });

  it('should be able to search nearby gyms', async () => {
    await inMemoryGymsRepository.create({
      title: 'Near Gym',
      description: '',
      phone: '',
      latitude: -23.6199288,
      longitude: -46.6971476,
    });

    await inMemoryGymsRepository.create({
      title: 'Far Gym',
      description: '',
      phone: '',
      latitude: -23.2949538,
      longitude: -46.7623315,
    });

    const { gyms } = await sut.execute({
      userLatitude: -23.6218824,
      userLongitude: -46.6973043,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })]);
  });
});
