import {
  Address,
  Company,
  Delivery,
  ServiceType,
} from 'src/domain/model/service-request'

export interface DeliveryDTO extends Omit<Delivery, 'lastAddress' | 'total'> {
  distanceFromCollectionAddress?: number
}

export interface CreateServiceRequestDTO {
  company: Company
  serviceType: ServiceType
  collectionAddress: Address
  deliveries: DeliveryDTO[]
}
