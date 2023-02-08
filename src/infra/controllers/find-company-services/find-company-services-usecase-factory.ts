import { PostgreServiceRequestRepository } from 'src/infra/repository/postgres/service-request-repository'
import { FindCompanyServices } from 'src/usecases/find-company-services/find-company-services-contracts'
import { FindCompanyServicesUseCase } from 'src/usecases/find-company-services/find-company-services-usecase'

const postgreServiceRequestRepository = new PostgreServiceRequestRepository()

export const findCompanyServicesUseCaseFactory = (): FindCompanyServices => {
  return new FindCompanyServicesUseCase(postgreServiceRequestRepository)
}
