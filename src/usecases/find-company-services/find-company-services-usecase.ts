import {
  CompanyServices,
  FindCompanyServices,
} from 'src/domain/usecases/find-company-services-/find'
import { FindCompanyServicesRepository } from '../create-service-request/create-service-request-contracts'

export class FindCompanyServicesUseCase implements FindCompanyServices {
  constructor(
    private readonly findServiceRequestRepository: FindCompanyServicesRepository,
  ) {}

  async find(companyId: number): Promise<CompanyServices> {
    await this.findServiceRequestRepository.findById(companyId)
    return {} as any
  }
}
