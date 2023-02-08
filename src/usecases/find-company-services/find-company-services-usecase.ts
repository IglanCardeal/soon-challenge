import { InvalidStarAndEndDateError } from 'src/domain/errors'
import {
  CompanyServices,
  FindCompanyServices,
} from 'src/domain/usecases/find-company-services-/find'
import { FindCompanyServicesDTO } from 'src/domain/usecases/find-company-services-/find-dto'
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

    const services = await this.findServiceRequestRepository.findById({
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
