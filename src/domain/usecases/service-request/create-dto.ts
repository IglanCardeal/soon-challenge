import {
  Address,
  Company,
  Delivery,
  ServiceType,
  Vehicle,
} from 'src/domain/model/service-request'

export interface CreateServiceRequestDTO {
  company: Company
  serviceType: ServiceType
  collectionAddress: Address
  deliveries: Pick<Delivery, 'finalAddress'>[]
  vehicles: Vehicle[]
}
