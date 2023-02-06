import {
  Address,
  Company,
  Delivery,
  ServiceType,
} from 'src/domain/model/service-request'

export interface VehicleDTO {
  plate: string
  model: string
  brand: string
  year: string
  delivery: Omit<Delivery, 'lastAddress' | 'total'>
}

export interface CreateServiceRequestDTO {
  company: Company
  serviceType: ServiceType
  collectionAddress: Address
  vehicles: VehicleDTO[]
}
