import { DomainConstants } from 'src/domain/constants'
import { InvalidVehiclesQtyError } from 'src/domain/errors'
import { ServiceRequest } from 'src/domain/model/service-request'
import { CreateServiceRequest } from 'src/domain/usecases/service-request/create'
import { CreateServiceRequestDTO } from 'src/domain/usecases/service-request/create-dto'

export class CreateServiceRequestUseCase implements CreateServiceRequest {
  constructor(private readonly domainConstants: DomainConstants) {}

  async create(
    data: CreateServiceRequestDTO,
  ): Promise<ServiceRequest | InvalidVehiclesQtyError> {
    const { serviceType, vehicles } = data
    const { maxVehicles } = this.domainConstants.requestService

    if (serviceType === 'guincho' && vehicles.length > maxVehicles.guincho) {
      return new InvalidVehiclesQtyError(
        `Invalid vehicle quantity for type ${serviceType}. Max of ${maxVehicles.guincho} vehicles.`,
      )
    }
    return {} as any
  }
}
