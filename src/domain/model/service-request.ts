export type Company = {
  id: string
  name: string
}

export type Vehicle = {
  plate: string
  model: string
  brand: string
  year: string
}

export type Address = {
  lat: string
  long: string
}

export type Total = {
  distance: number
  time: number
  servicePrice: number
}

export interface Delivery {
  finalAddress: Address
  lastAddress: Address
  total: Omit<Total, 'servicePrice'>
}

export type ServiceType = 'guincho' | 'cegonha'

export interface ServiceRequest {
  id: string
  serviceType: ServiceType
  createdAt: Date
  total: Total
  collectionAddress: Address
  company: Company
  deliveries: Delivery[]
  vehicles: Vehicle[]
}
