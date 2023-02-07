import { DomainConstants } from 'src/domain/constants'
import {
  InvalidFinalAddressError,
  InvalidServiceType,
  InvalidVehiclesQtyError,
} from 'src/domain/errors'
import { Address, ServiceRequest } from 'src/domain/model/service-request'
import { CreateServiceRequest } from 'src/domain/usecases/service-request/create'
import {
  CreateServiceRequestDTO,
  DeliveryDTO,
} from 'src/domain/usecases/service-request/create-dto'

export class CreateServiceRequestUseCase implements CreateServiceRequest {
  constructor(private readonly domainConstants: DomainConstants) {}

  async create(
    data: CreateServiceRequestDTO,
  ): Promise<ServiceRequest | InvalidVehiclesQtyError> {
    const { serviceType, deliveries, collectionAddress } = data
    const vehicles = deliveries
      .map((del) => del.vehicles.map((veh) => veh))
      .flat()

    const hasDeliveryWithouVehicle = deliveries.find(
      (del) => !del.vehicles?.length,
    )

    if (!vehicles.length || hasDeliveryWithouVehicle) {
      return new InvalidVehiclesQtyError('Invalid vehicle quantity 0.')
    }

    const hasOneInvalidFinalAddress = this.hasOneInvalidFinalAddress(
      deliveries,
      collectionAddress,
    )

    if (hasOneInvalidFinalAddress) {
      const plates = hasOneInvalidFinalAddress.vehicles.map((vel) => vel.plate)
      return new InvalidFinalAddressError(plates.join(', '))
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

  private hasOneInvalidFinalAddress(
    deliveries: DeliveryDTO[],
    collectionAddress: Address,
  ): DeliveryDTO | undefined {
    return deliveries.find((vel) => vel.finalAddress === collectionAddress)
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
