import { CreateServiceRequestDTO } from 'src/domain/usecases/service-request/create-dto'

const makeFakeDomainConstants = () => ({
  requestService: {
    maxVehicles: {
      guincho: 2,
      cegonha: 11,
    },
    pricePerKm: {
      guincho: {
        maxGuinchoKmForBasePrice: 4,
        km: 5,
        extraKm: 5 + 0.5,
      },
      cegonha: {
        maxCegonhaKmForBasePrice: 4,
        km: 10,
        extraKm: 10 + 1.5,
      },
    },
    validServiceTypes: ['guincho', 'cegonha'],
  },
})

const makeFakeDto = (): CreateServiceRequestDTO => ({
  company: {
    id: 'company_id',
    name: 'Wells',
  },
  serviceType: 'guincho',
  collectionAddress: {
    lat: -58.6521,
    long: -87.1162,
  },
  deliveries: [
    {
      finalAddress: {
        lat: -58.7521,
        long: -87.2162,
      },
      vehicles: [
        {
          brand: 'VW',
          model: 'Gol',
          year: '2015',
          plate: 'ABC-1234',
        },
      ],
    },
    {
      finalAddress: {
        lat: -58.7523,
        long: -87.2181,
      },
      vehicles: [
        {
          brand: 'Ford',
          model: 'Wrangler',
          year: '2012',
          plate: 'CDE-1234',
        },
      ],
    },
  ],
})

export { makeFakeDomainConstants, makeFakeDto }
