import { Company } from './company'

export { Company }

export type Vehicle = {
  plate: string
  model: string
  brand: string
  year: string
}

export interface Delivery {
  vehicles: Vehicle[]
  finalAddress: Address
  lastAddress: Address
  total: Omit<Total, 'servicePrice'>
}

export type Address = {
  lat: number
  long: number
}

export type Total = {
  distance: number
  duration: number
  servicePrice: number
}

export type ServiceType = 'guincho' | 'cegonha'

export interface ServiceRequest {
  id: string
  serviceType: ServiceType
  createdAt: Date
  total: Total
  collectionAddress: Address
  deliveries: Delivery[]
  vehicles: Vehicle[]
  company: Company
}
