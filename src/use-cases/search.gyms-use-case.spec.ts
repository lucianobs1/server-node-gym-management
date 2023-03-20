import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { SearchGymsUseCase } from './search.gyms-use-case';

let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(inMemoryGymsRepository);
  });

  it('should be able to to search for gyms', async () => {
    await inMemoryGymsRepository.create({
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -23.6218824,
      longitude: -46.697299,
    });

    await inMemoryGymsRepository.create({
      title: 'Typescript Gym',
      description: '',
      phone: '',
      latitude: -23.6218824,
      longitude: -46.697299,
    });

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym' }),
    ]);
  });

  it.skip('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: '',
        phone: '',
        latitude: -23.6218824,
        longitude: -46.697299,
      });
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ]);
  });
});
