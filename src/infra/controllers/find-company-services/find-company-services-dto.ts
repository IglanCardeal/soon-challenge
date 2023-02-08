import { IsNumber, IsDefined, IsDateString } from 'class-validator'

export class FindByCompanyParamsDTO {
  @IsDefined()
  @IsNumber()
  companyId: number

  @IsDefined()
  @IsDateString()
  startDate: Date

  @IsDefined()
  @IsDateString()
  endDate: Date
}
