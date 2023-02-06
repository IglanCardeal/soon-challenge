export class InvalidVehiclesQtyError extends Error {
  constructor(msg: string) {
    super('InvalidVehiclesQtyError')
    this.message = msg
  }
}
