import { Address } from '../model/service-request'

export interface CalculateDistanceProvider {
  fromOriginToDestiny(origin: Address, destiny: Address): Promise<number>
}
