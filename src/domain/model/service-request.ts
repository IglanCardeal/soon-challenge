export type Company = {
  id: string
  name: string
}

export interface Delivery {
  finalAddress: Address
  lastAddress: Address
  total: Omit<Total, 'servicePrice'>
}

export type Vehicle = {
  plate: string
  model: string
  brand: string
  year: string
  delivery: Delivery
}

export type Address = {
  lat: number
  long: number
}

export type Total = {
  distance: number
  time: number
  servicePrice: number
}

export type ServiceType = 'guincho' | 'cegonha'

export interface ServiceRequest {
  id: string
  serviceType: ServiceType
  createdAt: Date
  total: Total
  collectionAddress: Address
  company: Company
  vehicles: Vehicle[]
}
