import {
  Address,
  Company,
  Delivery,
  ServiceType,
} from 'src/domain/model/service-request'

export type DeliveryDTO = Omit<Delivery, 'lastAddress' | 'total'>

export interface CreateServiceRequestDTO {
  company: Company
  serviceType: ServiceType
  collectionAddress: Address
  deliveries: DeliveryDTO[]
}
