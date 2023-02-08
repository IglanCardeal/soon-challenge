import {
  IsIn,
  IsNotEmpty,
  IsArray,
  IsNumber,
  IsDefined,
  IsString,
  ValidateNested,
  IsDateString,
} from 'class-validator'

import { Type } from 'class-transformer'

export class Address {
  @IsNumber()
  lat: number

  @IsNumber()
  long: number
}

export class Vehicle {
  @IsString()
  @IsNotEmpty()
  plate: string

  @IsString()
  @IsNotEmpty()
  model: string

  @IsString()
  @IsNotEmpty()
  brand: string

  @IsString()
  @IsNotEmpty()
  year: string
}

export class Delivery {
  @IsDefined()
  @IsArray()
  @ValidateNested()
  @Type(() => Vehicle)
  vehicles: Vehicle[]

  @IsDefined()
  finalAddress: Address
}

export class Company {
  @IsNumber()
  id: number

  @IsNotEmpty()
  name: string
}

export class ControllerCreateRequestServiceDTO {
  @IsDefined()
  company: Company

  @IsNotEmpty()
  @IsIn(['cegonha', 'guincho'])
  serviceType: any

  @IsDefined()
  @ValidateNested()
  @Type(() => Address)
  collectionAddress: Address

  @IsDefined()
  @IsArray()
  @ValidateNested()
  @Type(() => Delivery)
  deliveries: Delivery[]
}

export class FindParamsDTO {
  @IsString()
  @IsNotEmpty()
  id: string
}

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
