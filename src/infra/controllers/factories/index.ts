import { CreateServiceRequest } from 'src/domain/usecases/service-request/create'
import { domainConstants } from '../../../domain/constants'
import { CreateServiceRequestUseCase } from 'src/usecases/service-request/create-service-request-usecase'
import { config } from 'src/infra/config'
import { GoogleCalculateDistanceAndDurationProvider } from 'src/infra/providers/google/calculate-distance-provider'
import { PostgreServiceRequestRepository } from 'src/infra/repository/postgres/service-request-repository'

export const googleCalculateDistanceAndDurationProviderFactory = () => {
  const googleApiKey = config.env.GOOGLE_CLOUD_API_KEY
  const googleUrl = config.env.GOOGLE_CLOUD_API_URL
  return new GoogleCalculateDistanceAndDurationProvider(googleApiKey, googleUrl)
}

export const createServiceRequestUseCaseFactory = (): CreateServiceRequest => {
  return new CreateServiceRequestUseCase(
    domainConstants,
    googleCalculateDistanceAndDurationProviderFactory(),
    new PostgreServiceRequestRepository(),
  )
}
