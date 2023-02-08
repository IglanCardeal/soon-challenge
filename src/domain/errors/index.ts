export class InvalidVehiclesQtyError extends Error {
  constructor(msg: string) {
    super('InvalidVehiclesQtyError')
    this.message = msg
  }
}

export class InvalidServiceType extends Error {
  constructor(type: string, validTypes: string[]) {
    super('InvalidServiceType')
    const valids = `Valid types: ${validTypes.join(',')}`
    this.message = `Invalid service type ${type}. ${valids}`
  }
}

export class InvalidFinalAddressError extends Error {
  constructor(plate: string) {
    super('InvalidFinalAddressError')
    this.message = `The vehicle with the plate ${plate} has the final address equal to the collection address`
  }
}

export class InvalidStarAndEndDateError extends Error {
  constructor() {
    super('InvalidStarAndEndDateError')
    this.message = `The start and end date are invalid`
  }
}
