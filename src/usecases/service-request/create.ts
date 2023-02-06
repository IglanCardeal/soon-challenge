import { DomainConstants } from 'src/domain/constants'
import { InvalidServiceType, InvalidVehiclesQtyError } from 'src/domain/errors'
import { ServiceRequest } from 'src/domain/model/service-request'
import { CreateServiceRequest } from 'src/domain/usecases/service-request/create'
import { CreateServiceRequestDTO } from 'src/domain/usecases/service-request/create-dto'

export class CreateServiceRequestUseCase implements CreateServiceRequest {
  constructor(private readonly domainConstants: DomainConstants) {}

  async create(
    data: CreateServiceRequestDTO,
  ): Promise<ServiceRequest | InvalidVehiclesQtyError> {
    const { serviceType, vehicles } = data
    const { maxVehicles, validServiceTypes } =
      this.domainConstants.requestService

    if (!validServiceTypes.includes(serviceType)) {
      return new InvalidServiceType(serviceType, validServiceTypes)
    }

    if (serviceType === 'guincho' && vehicles.length > maxVehicles.guincho) {
      return new InvalidVehiclesQtyError(
        `Invalid vehicle quantity for type ${serviceType}. Max of ${maxVehicles.guincho} vehicles.`,
      )
    }

    return {} as any
  }
}
