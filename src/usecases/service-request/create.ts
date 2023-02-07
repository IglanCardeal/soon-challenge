import {
  InvalidFinalAddressError,
  InvalidServiceType,
  InvalidVehiclesQtyError,
} from 'src/domain/errors'
import {
  CreateServiceRequest,
  CreateServiceRequestDTO,
  DeliveryDTO,
  Address,
  Delivery,
  ServiceRequest,
  ServiceType,
  Total,
  CalculateDistanceAndDurationProvider,
  ServiceRequestRepository,
  DomainConstants,
} from './create-contracts'

export class CreateServiceRequestUseCase implements CreateServiceRequest {
  constructor(
    private readonly domainConstants: DomainConstants,
    private readonly calculateDistanceAndDurationProvider: CalculateDistanceAndDurationProvider,
    private readonly serviceRequestRepository: ServiceRequestRepository,
  ) {}

  async create(
    data: CreateServiceRequestDTO,
  ): Promise<ServiceRequest | InvalidVehiclesQtyError> {
    const { serviceType, deliveries, collectionAddress, company } = data
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

    if (
      serviceType === 'guincho' &&
      this.checkInvalidVehiclesQty(vehicles, guincho)
    ) {
      return this.invalidVehiclesQtyErrorFactory(serviceType, guincho)
    }

    if (
      serviceType === 'cegonha' &&
      this.checkInvalidVehiclesQty(vehicles, cegonha)
    ) {
      return this.invalidVehiclesQtyErrorFactory(serviceType, cegonha)
    }

    await this.calculateDistanceFromCollectionAddress(
      deliveries,
      collectionAddress,
    )
    this.orderDeliveriesByDistanceFromCollectionAddress(deliveries)
    this.setLinkedListBasedOnLastAddress(deliveries, collectionAddress)

    const deliveriesWithAllFields: Delivery[] =
      await this.setAllDeliveriesFields(deliveries)

    const total: Total = {
      distance: deliveriesWithAllFields.reduce(
        (prev, acc) => prev + acc.total.distance,
        0,
      ),
      duration: deliveriesWithAllFields.reduce(
        (prev, acc) => prev + acc.total.duration,
        0,
      ),
      servicePrice: 0,
    }

    total.servicePrice = this.calculateTotalServicePrice(total, serviceType)

    const serviceRequestData: Omit<ServiceRequest, 'id'> = {
      collectionAddress,
      company,
      deliveries: deliveriesWithAllFields,
      serviceType,
      total,
      vehicles,
      createdAt: new Date(),
    }

    return await this.serviceRequestRepository.save(serviceRequestData)
  }

  private hasOneInvalidFinalAddress(
    deliveries: DeliveryDTO[],
    collectionAddress: Address,
  ): DeliveryDTO | undefined {
    return deliveries.find((vel) => vel.finalAddress === collectionAddress)
  }

  private checkInvalidVehiclesQty(
    vehicles: any[],
    maxVehicles: number,
  ): boolean {
    return vehicles.length > maxVehicles
  }

  private invalidVehiclesQtyErrorFactory(
    serviceType: string,
    maxVehicles: number,
  ) {
    return new InvalidVehiclesQtyError(
      `Invalid vehicle quantity for type ${serviceType}. Max of ${maxVehicles} vehicles.`,
    )
  }

  private async calculateDistanceFromCollectionAddress(
    deliveries: DeliveryDTO[],
    collectionAddress,
  ) {
    for (let index = 0; index < deliveries.length; index++) {
      const { distance } =
        await this.calculateDistanceAndDurationProvider.fromOriginToDestiny(
          collectionAddress,
          deliveries[index].finalAddress,
        )
      deliveries[index].distanceFromCollectionAddress = distance
    }
  }

  private orderDeliveriesByDistanceFromCollectionAddress(
    deliveries: DeliveryDTO[],
  ) {
    return deliveries.sort(
      (a, b) =>
        a.distanceFromCollectionAddress - b.distanceFromCollectionAddress,
    )
  }

  private setLinkedListBasedOnLastAddress(
    deliveries: DeliveryDTO[],
    collectionAddress: Address,
  ) {
    for (let index = 0; index < deliveries.length; index++) {
      if (index > 0) {
        deliveries[index] = {
          ...deliveries[index],
          lastAddress: deliveries[index - 1].finalAddress,
        }
      } else {
        deliveries[index] = {
          ...deliveries[index],
          lastAddress: collectionAddress,
        }
      }
    }
  }

  private async setAllDeliveriesFields(deliveries: DeliveryDTO[]) {
    const deliveriesWithAllFields: Delivery[] = []

    for (let index = 0; index < deliveries.length; index++) {
      const { lastAddress, finalAddress, vehicles } = deliveries[index]
      const { distance, duration } =
        await this.calculateDistanceAndDurationProvider.fromOriginToDestiny(
          lastAddress,
          finalAddress,
        )
      deliveriesWithAllFields.push({
        finalAddress,
        lastAddress,
        vehicles,
        total: {
          distance,
          duration,
        },
      })
    }

    return deliveriesWithAllFields
  }

  private calculateTotalServicePrice(
    total: Total,
    serviceType: ServiceType,
  ): number {
    if (serviceType === 'guincho') {
      return this.calculateTotalServicePriceForGuincho(total)
    }

    return this.calculateTotalServicePriceForCegonha(total)
  }

  private calculateTotalServicePriceForGuincho(total: Total) {
    const {
      pricePerKm: { guincho },
    } = this.domainConstants.requestService

    if (total.distance > guincho.maxGuinchoKmForBasePrice) {
      const { maxGuinchoKmForBasePrice, extraKm, km } = guincho
      const extraDistance = total.distance - maxGuinchoKmForBasePrice
      const extraValue = extraDistance * extraKm
      const baseValue = maxGuinchoKmForBasePrice * km
      return baseValue + extraValue
    }

    return total.distance * guincho.km
  }

  private calculateTotalServicePriceForCegonha(total: Total) {
    const {
      pricePerKm: { cegonha },
    } = this.domainConstants.requestService

    if (total.distance > cegonha.maxCegonhaKmForBasePrice) {
      const { maxCegonhaKmForBasePrice, extraKm, km } = cegonha
      const extraDistance = total.distance - maxCegonhaKmForBasePrice
      const extraValue = extraDistance * extraKm
      const baseValue = maxCegonhaKmForBasePrice * km
      return baseValue + extraValue
    }

    return total.distance * cegonha.km
  }
}
