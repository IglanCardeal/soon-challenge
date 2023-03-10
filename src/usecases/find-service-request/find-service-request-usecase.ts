import {
  FindServiceRequest,
  ServiceRequest,
  FindServiceRequestRepository,
} from './find-service-request-contracts'

export class FindServiceRequestUseCase implements FindServiceRequest {
  constructor(
    private readonly findServiceRequestRepository: FindServiceRequestRepository,
  ) {}

  async find(id: string): Promise<ServiceRequest | null> {
    return await this.findServiceRequestRepository.findById(id)
  }
}
