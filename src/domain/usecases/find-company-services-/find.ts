import { ServiceRequest } from 'src/domain/model/service-request'

export type TotalOfServices = {
  open: number
  value: number
}

export interface CompanyServices {
  services: ServiceRequest[]
  total: TotalOfServices
}

export interface FindCompanyServices {
  find(id: number): Promise<CompanyServices>
}
