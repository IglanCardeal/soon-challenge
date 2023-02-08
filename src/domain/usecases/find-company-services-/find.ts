import { InvalidStarAndEndDateError } from 'src/domain/errors'
import { ServiceRequest } from 'src/domain/model/service-request'
import { FindCompanyServicesDTO } from './find-dto'

export type TotalOfServices = {
  count: number
  fullPrice: number
}

export interface CompanyServices {
  services: ServiceRequest[]
  total: TotalOfServices
}

export interface FindCompanyServices {
  find(
    data: FindCompanyServicesDTO,
  ): Promise<CompanyServices | InvalidStarAndEndDateError>
}
