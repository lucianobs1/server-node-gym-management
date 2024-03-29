import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';
import { CheckIn } from '@prisma/client';
import dayjs from 'dayjs';
import { LateValidationCheckInError } from './errors/late-check-in-validation-error';
import { MaxDistanceError } from './errors/max-distance-error';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes'
    );

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateValidationCheckInError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}
