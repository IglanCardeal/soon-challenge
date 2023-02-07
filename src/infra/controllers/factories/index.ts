import { CreateServiceRequest } from 'src/domain/usecases/create-service-request/create'
import { domainConstants } from '../../../domain/constants'
import { CreateServiceRequestUseCase } from 'src/usecases/create-service-request/create-service-request-usecase'
import { config } from 'src/infra/config'
import { GoogleCalculateDistanceAndDurationProvider } from 'src/infra/providers/google/calculate-distance-provider'
import { PostgreServiceRequestRepository } from 'src/infra/repository/postgres/service-request-repository'
import { FindServiceRequest } from 'src/usecases/find-service-request/find-service-request-contracts'
import { FindServiceRequestUseCase } from 'src/usecases/find-service-request/find-service-request-usecase'

export const googleCalculateDistanceAndDurationProviderFactory = () => {
  const googleApiKey = config.env.GOOGLE_CLOUD_API_KEY
  const googleUrl = config.env.GOOGLE_CLOUD_API_URL
  return new GoogleCalculateDistanceAndDurationProvider(googleApiKey, googleUrl)
}

const postgreServiceRequestRepository = new PostgreServiceRequestRepository()

export const createServiceRequestUseCaseFactory = (): CreateServiceRequest => {
  return new CreateServiceRequestUseCase(
    domainConstants,
    googleCalculateDistanceAndDurationProviderFactory(),
    postgreServiceRequestRepository,
  )
}

export const findServiceRequestUseCaseFactory = (): FindServiceRequest => {
  return new FindServiceRequestUseCase(postgreServiceRequestRepository)
}
