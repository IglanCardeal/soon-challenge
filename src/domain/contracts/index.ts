import { Address, ServiceRequest } from '../model/service-request'
import { FindCompanyServicesDTO } from '../usecases/find-company-services-/find-dto'

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

export interface FindCompanyServicesRepository {
  findById(data: FindCompanyServicesDTO): Promise<ServiceRequest[]>
}
