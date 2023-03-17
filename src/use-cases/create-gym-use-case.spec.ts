import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { CreateGymUseCase } from './create-gym-use-case';

let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(inMemoryGymsRepository);
  });

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Javascript gym',
      description: '',
      phone: '',
      latitude: -23.6218824,
      longitude: -46.697299,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
