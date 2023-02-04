const pricePerKmForGuinchoInReais = 120 / 20
const extraPricePerKmForGuinchoInReais = pricePerKmForGuinchoInReais + 1.37
const pricePerKmForCegonhaInReais = 370 / 20
const extraPricePerKmForCegonhaInReais = pricePerKmForGuinchoInReais + 5.33

const pricePerKm = {
  guincho: {
    km: pricePerKmForGuinchoInReais,
    extraKm: extraPricePerKmForGuinchoInReais,
  },
  cegonha: {
    km: pricePerKmForCegonhaInReais,
    extraKm: extraPricePerKmForCegonhaInReais,
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
  },
})
