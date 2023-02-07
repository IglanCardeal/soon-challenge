import { ServiceRequest } from 'src/domain/model/service-request'

export interface FindServiceRequest {
  find(id: string): Promise<ServiceRequest | null>
}
