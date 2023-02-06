import { DomainConstants } from 'src/domain/constants'
import { InvalidServiceType, InvalidVehiclesQtyError } from 'src/domain/errors'
import { ServiceRequest, Vehicle } from 'src/domain/model/service-request'
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

    if (this.checkVehiclesQtyForGuincho(serviceType, vehicles)) {
      return this.invalidVehiclesQtyError(serviceType, maxVehicles.guincho)
    }

    if (this.checkVehiclesQtyForCegonha(serviceType, vehicles)) {
      return this.invalidVehiclesQtyError(serviceType, maxVehicles.cegonha)
    }

    return {} as any
  }

  private checkVehiclesQtyForGuincho(
    serviceType: string,
    vehicles: Vehicle[],
  ): boolean {
    const { maxVehicles } = this.domainConstants.requestService
    return serviceType === 'guincho' && vehicles.length > maxVehicles.guincho
  }

  private checkVehiclesQtyForCegonha(
    serviceType: string,
    vehicles: Vehicle[],
  ): boolean {
    const { maxVehicles } = this.domainConstants.requestService
    return serviceType === 'cegonha' && vehicles.length > maxVehicles.cegonha
  }

  private invalidVehiclesQtyError(serviceType: string, maxVehicles: number) {
    return new InvalidVehiclesQtyError(
      `Invalid vehicle quantity for type ${serviceType}. Max of ${maxVehicles} vehicles.`,
    )
  }
}
