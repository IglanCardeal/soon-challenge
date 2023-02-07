import { Address, ServiceRequest } from '../model/service-request'

export type CalculateDistanceAndDurationProviderResponse = {
  distance: number
  duration: number
}

export interface CalculateDistanceAndDurationProvider {
  fromOriginToDestiny(
    origin: Address,
    destiny: Address,
  ): Promise<CalculateDistanceAndDurationProviderResponse>
}

export interface ServiceRequestRepository {
  save(serviceRequest: Omit<ServiceRequest, 'id'>): Promise<ServiceRequest>
}

export interface FindServiceRequestRepository {
  findById(id: string): Promise<ServiceRequest | null>
}
