import {
  InvalidFinalAddressError,
  InvalidServiceType,
  InvalidVehiclesQtyError,
} from 'src/domain/errors'
import { ServiceRequest } from 'src/domain/model/service-request'
import { CreateServiceRequestDTO } from './create-dto'

export type Success = ServiceRequest
export type Fail =
  | InvalidVehiclesQtyError
  | InvalidServiceType
  | InvalidFinalAddressError

export interface CreateServiceRequest {
  create(data: CreateServiceRequestDTO): Promise<Success | Fail>
}
