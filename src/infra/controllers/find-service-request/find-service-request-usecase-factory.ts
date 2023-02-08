import { PostgreServiceRequestRepository } from 'src/infra/repository/postgres/service-request-repository'
import { FindServiceRequest } from 'src/usecases/find-service-request/find-service-request-contracts'
import { FindServiceRequestUseCase } from 'src/usecases/find-service-request/find-service-request-usecase'

const postgreServiceRequestRepository = new PostgreServiceRequestRepository()

export const findServiceRequestUseCaseFactory = (): FindServiceRequest => {
  return new FindServiceRequestUseCase(postgreServiceRequestRepository)
}
