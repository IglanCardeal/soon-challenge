import { InvalidStarAndEndDateError } from 'src/domain/errors'
import { FindCompanyServicesDTO } from './find-dto'

export type TotalOfServices = {
  count: number
  fullPrice: number
}

export interface CompanyServices {
  total: TotalOfServices
}

export interface FindCompanyServices {
  find(
    data: FindCompanyServicesDTO,
  ): Promise<CompanyServices | InvalidStarAndEndDateError>
}
