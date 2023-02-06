import {
  InvalidFinalAddressError,
  InvalidServiceType,
  InvalidVehiclesQtyError,
} from 'src/domain/errors'
import { CreateServiceRequestDTO } from 'src/domain/usecases/service-request/create-dto'
import { DomainConstants } from 'src/domain/constants'
import { CreateServiceRequestUseCase } from './create'

const makeFakeDomainConstants = () => ({
  requestService: {
    maxVehicles: {
      guincho: 2,
      cegonha: 11,
    },
    validServiceTypes: ['guincho', 'cegonha'],
  },
})
const makeSut = () => {
  return {
    sut: new CreateServiceRequestUseCase(
      makeFakeDomainConstants() as DomainConstants,
    ),
  }
}
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
  vehicles: [
    {
      brand: 'VW',
      model: 'Gol',
      year: '2015',
      plate: 'ABC-1234',
      delivery: {
        finalAddress: {
          lat: -58.7521,
          long: -87.2162,
        },
      },
    },
    {
      brand: 'Ford',
      model: 'Wrangler',
      year: '2012',
      plate: 'CDE-1234',
      delivery: {
        finalAddress: {
          lat: -58.7521,
          long: -87.2162,
        },
      },
    },
  ],
})

describe('CreateServiceRequestUseCase', () => {
  let fakeDto: CreateServiceRequestDTO
  const { sut } = makeSut()

  beforeEach(() => {
    fakeDto = makeFakeDto()
  })

  it('Should return InvalidServiceType when invalid service type', async () => {
    const result = await sut.create({
      ...fakeDto,
      serviceType: 'invalid' as any,
    })
    expect(result).toBeInstanceOf(InvalidServiceType)
  })

  it('Should return InvalidVehiclesQtyError when no vehicles', async () => {
    fakeDto.vehicles = []
    const result = await sut.create(fakeDto)
    expect(result).toEqual(
      new InvalidVehiclesQtyError('Invalid vehicle quantity 0.'),
    )
  })

  it('Should return InvalidVehiclesQtyError when more than 2 vehicles for a service type "guincho"', async () => {
    fakeDto.vehicles.push({
      brand: 'Ford',
      model: 'Wrangler',
      year: '2015',
      plate: 'ZXW-1234',
      delivery: {
        finalAddress: {
          lat: -58.7521,
          long: -87.2162,
        },
      },
    })
    const result = await sut.create(fakeDto)
    expect(result).toEqual(
      new InvalidVehiclesQtyError(
        'Invalid vehicle quantity for type guincho. Max of 2 vehicles.',
      ),
    )
  })

  it('Should return InvalidVehiclesQtyError when more than 11 vehicles for a service type "cegonha"', async () => {
    fakeDto.serviceType = 'cegonha'
    fakeDto.vehicles.length = 12
    fakeDto.vehicles.fill({
      brand: 'Ford',
      model: 'Wrangler',
      year: '2015',
      plate: 'ZXW-1234',
      delivery: {
        finalAddress: {
          lat: -58.7521,
          long: -87.2162,
        },
      },
    })
    const result = await sut.create(fakeDto)
    expect(result).toEqual(
      new InvalidVehiclesQtyError(
        'Invalid vehicle quantity for type cegonha. Max of 11 vehicles.',
      ),
    )
  })

  it('Should return InvalidFinalAddressError if one of the vehicles has the final address equals to the collection address', async () => {
    fakeDto.vehicles[0].delivery.finalAddress = fakeDto.collectionAddress
    const result = await sut.create(fakeDto)
    expect(result).toEqual(new InvalidFinalAddressError('ABC-1234'))
  })
})
