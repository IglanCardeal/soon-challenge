const maxGuinchoKmForBasePrice = 20
const guinchoServiceBasePrice = 120
const pricePerKmForGuinchoInReais =
  guinchoServiceBasePrice / maxGuinchoKmForBasePrice
const extraPricePerKmForGuinchoInReais = pricePerKmForGuinchoInReais + 1.37

const maxCegonhaKmForBasePrice = 20
const cegonhaServiceBasePrice = 370
const pricePerKmForCegonhaInReais =
  cegonhaServiceBasePrice / maxCegonhaKmForBasePrice
const extraPricePerKmForCegonhaInReais = pricePerKmForCegonhaInReais + 5.33

const pricePerKm = {
  guincho: {
    maxGuinchoKmForBasePrice,
    km: pricePerKmForGuinchoInReais,
    extraKm: extraPricePerKmForGuinchoInReais,
  },
  cegonha: {
    km: pricePerKmForCegonhaInReais,
    extraKm: extraPricePerKmForCegonhaInReais,
    maxCegonhaKmForBasePrice,
  },
}
const maxVehicles = {
  guincho: 2,
  cegonha: 11,
}

export const domainConstants = Object.freeze({
  requestService: {
    maxVehicles,
    pricePerKm,
    validServiceTypes: ['guincho', 'cegonha'],
  },
})

export type DomainConstants = typeof domainConstants
