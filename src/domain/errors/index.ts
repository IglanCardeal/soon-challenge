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
