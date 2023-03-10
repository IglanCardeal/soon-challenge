import { Address, ServiceRequest } from '../model/service-request'
import { FindCompanyServicesDTO } from '../usecases/find-company-services/find-dto'

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

export type FindCompanyServicesRepositoryResponse = {
  count: number
  totalPrice: number
}

export interface FindCompanyServicesRepository {
  findByCompanyId(
    data: FindCompanyServicesDTO,
  ): Promise<FindCompanyServicesRepositoryResponse>
}
