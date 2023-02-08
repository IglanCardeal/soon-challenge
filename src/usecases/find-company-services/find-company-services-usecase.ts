import { InvalidStarAndEndDateError } from 'src/domain/errors'
import {
  CompanyServices,
  FindCompanyServices,
  FindCompanyServicesDTO,
} from './find-company-services-contracts'
import { FindCompanyServicesRepository } from '../create-service-request/create-service-request-contracts'

export class FindCompanyServicesUseCase implements FindCompanyServices {
  constructor(
    private readonly findServiceRequestRepository: FindCompanyServicesRepository,
  ) {}

  async find({
    companyId,
    startDate,
    endDate,
  }: FindCompanyServicesDTO): Promise<
    CompanyServices | InvalidStarAndEndDateError
  > {
    if (startDate >= endDate) {
      return new InvalidStarAndEndDateError()
    }

    const result = await this.findServiceRequestRepository.findByCompanyId({
      companyId,
      startDate,
      endDate,
    })

    return {
      total: {
        count: result.count,
        fullPrice: result.totalPrice,
      },
    }
  }
}
