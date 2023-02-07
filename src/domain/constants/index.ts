const maxGuinchoKmForBasePrice = 120
const pricePerKmForGuinchoInReais = maxGuinchoKmForBasePrice / 20
const extraPricePerKmForGuinchoInReais = pricePerKmForGuinchoInReais + 1.37

const maxCegonhaKmForBasePrice = 370
const pricePerKmForCegonhaInReais = maxCegonhaKmForBasePrice / 20
const extraPricePerKmForCegonhaInReais = pricePerKmForGuinchoInReais + 5.33

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
