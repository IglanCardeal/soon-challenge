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

    const services = await this.findServiceRequestRepository.findByCompanyId({
      companyId,
      startDate,
      endDate,
    })

    return {
      services,
      total: {
        count: services.length,
        fullPrice: services.reduce(
          (prev, act) => prev + act.total.servicePrice,
          0,
        ),
      },
    }
  }
}
