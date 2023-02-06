import { DomainConstants } from 'src/domain/constants'
import {
  InvalidFinalAddressError,
  InvalidServiceType,
  InvalidVehiclesQtyError,
} from 'src/domain/errors'
import { ServiceRequest } from 'src/domain/model/service-request'
import { CreateServiceRequest } from 'src/domain/usecases/service-request/create'
import { CreateServiceRequestDTO } from 'src/domain/usecases/service-request/create-dto'

export class CreateServiceRequestUseCase implements CreateServiceRequest {
  constructor(private readonly domainConstants: DomainConstants) {}

  async create(
    data: CreateServiceRequestDTO,
  ): Promise<ServiceRequest | InvalidVehiclesQtyError> {
    const { serviceType, vehicles, collectionAddress } = data

    if (!vehicles.length) {
      return new InvalidVehiclesQtyError('Invalid vehicle quantity 0.')
    }

    const hasOneInvalidFinalAddress = vehicles.find((vel) => {
      return vel.delivery.finalAddress === collectionAddress
    })

    if (hasOneInvalidFinalAddress) {
      const { plate } = hasOneInvalidFinalAddress
      return new InvalidFinalAddressError(plate)
    }

    const {
      maxVehicles: { cegonha, guincho },
      validServiceTypes,
    } = this.domainConstants.requestService

    if (!validServiceTypes.includes(serviceType)) {
      return new InvalidServiceType(serviceType, validServiceTypes)
    }

    if (this.checkVehiclesQtyForGuincho(serviceType, vehicles, guincho)) {
      return this.invalidVehiclesQtyErrorFactory(serviceType, guincho)
    }

    if (this.checkVehiclesQtyForCegonha(serviceType, vehicles, cegonha)) {
      return this.invalidVehiclesQtyErrorFactory(serviceType, cegonha)
    }

    return {} as any
  }

  private checkVehiclesQtyForGuincho(
    serviceType: string,
    vehicles: any[],
    maxVehicles: number,
  ): boolean {
    return serviceType === 'guincho' && vehicles.length > maxVehicles
  }

  private checkVehiclesQtyForCegonha(
    serviceType: string,
    vehicles: any[],
    maxVehicles: number,
  ): boolean {
    return serviceType === 'cegonha' && vehicles.length > maxVehicles
  }

  private invalidVehiclesQtyErrorFactory(
    serviceType: string,
    maxVehicles: number,
  ) {
    return new InvalidVehiclesQtyError(
      `Invalid vehicle quantity for type ${serviceType}. Max of ${maxVehicles} vehicles.`,
    )
  }
}
