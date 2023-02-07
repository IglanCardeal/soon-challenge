import {
  InvalidFinalAddressError,
  InvalidServiceType,
  InvalidVehiclesQtyError,
} from 'src/domain/errors'
import { CreateServiceRequestDTO } from 'src/domain/usecases/service-request/create-dto'
import { DomainConstants } from 'src/domain/constants'
import { CreateServiceRequestUseCase } from './create'
import {
  CalculateDistanceAndDurationProvider,
  CalculateDistanceAndDurationProviderResponse,
  ServiceRequestRepository,
} from 'src/domain/contracts'
import { Address, ServiceRequest } from 'src/domain/model/service-request'

class CalculateDistanceAndDurationProviderStub
  implements CalculateDistanceAndDurationProvider
{
  async fromOriginToDestiny(
    _origin: Address,
    _destiny: Address,
  ): Promise<CalculateDistanceAndDurationProviderResponse> {
    return {
      distance: 1,
      duration: 1,
    }
  }
}

class ServiceRequestRepositoryStub implements ServiceRequestRepository {
  async save(
    _serviceRequest: Omit<ServiceRequest, 'id'>,
  ): Promise<ServiceRequest> {
    return {} as ServiceRequest
  }
}

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
const makeSut = () => {
  const calculateDistanceAndDurationStub =
    new CalculateDistanceAndDurationProviderStub()
  const serviceRequestRepositoryStub = new ServiceRequestRepositoryStub()
  return {
    sut: new CreateServiceRequestUseCase(
      makeFakeDomainConstants() as DomainConstants,
      calculateDistanceAndDurationStub,
      serviceRequestRepositoryStub,
    ),
    calculateDistanceAndDurationStub,
    serviceRequestRepositoryStub,
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

describe('CreateServiceRequestUseCase', () => {
  let fakeDto: CreateServiceRequestDTO
  const {
    sut,
    calculateDistanceAndDurationStub,
    serviceRequestRepositoryStub,
  } = makeSut()

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
    fakeDto.deliveries = fakeDto.deliveries.map((del) => ({
      ...del,
      vehicles: [],
    }))
    const result = await sut.create(fakeDto)
    expect(result).toEqual(
      new InvalidVehiclesQtyError('Invalid vehicle quantity 0.'),
    )
  })

  it('Should return InvalidVehiclesQtyError when one delivery without vehicles', async () => {
    fakeDto.deliveries[1] = {
      finalAddress: {
        lat: -58.7521,
        long: -87.2162,
      },
      vehicles: [],
    }
    const result = await sut.create(fakeDto)
    expect(result).toEqual(
      new InvalidVehiclesQtyError('Invalid vehicle quantity 0.'),
    )
  })

  it('Should return InvalidVehiclesQtyError when more than 2 vehicles for a service type "guincho"', async () => {
    fakeDto.deliveries[0].vehicles.push({
      brand: 'Ford',
      model: 'Wrangler',
      year: '2015',
      plate: 'ZXW-1234',
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
    fakeDto.deliveries[0].vehicles.length = 12
    fakeDto.deliveries[0].vehicles.fill({
      brand: 'Ford',
      model: 'Wrangler',
      year: '2015',
      plate: 'ZXW-1234',
    })
    const result = await sut.create(fakeDto)
    expect(result).toEqual(
      new InvalidVehiclesQtyError(
        'Invalid vehicle quantity for type cegonha. Max of 11 vehicles.',
      ),
    )
  })

  it('Should return InvalidFinalAddressError if one of the vehicles has the final address equals to the collection address', async () => {
    fakeDto.deliveries[0].finalAddress = fakeDto.collectionAddress
    const result = await sut.create(fakeDto)
    expect(result).toEqual(new InvalidFinalAddressError('ABC-1234'))
  })

  it('Should call CalculateDistanceProvider with correct values', async () => {
    const fromOriginToDestinySpy = jest.spyOn(
      calculateDistanceAndDurationStub,
      'fromOriginToDestiny',
    )
    await sut.create(fakeDto)
    expect(fromOriginToDestinySpy).toHaveBeenNthCalledWith(
      1,
      { lat: -58.6521, long: -87.1162 },
      { lat: -58.7521, long: -87.2162 },
    )
    expect(fromOriginToDestinySpy).toHaveBeenNthCalledWith(
      2,
      { lat: -58.6521, long: -87.1162 },
      { lat: -58.7523, long: -87.2181 },
    )
  })

  it('Should call serviceRequestRepository with correct formated and ordered values', async () => {
    const expectedServiceRequest = {
      collectionAddress: {
        lat: -58.6521,
        long: -87.1162,
      },
      company: {
        id: 'company_id',
        name: 'Wells',
      },
      serviceType: 'guincho',
      createdAt: expect.any(Date),
      total: {
        distance: 5,
        duration: 4,
        servicePrice: 25.5,
      },
      vehicles: [
        {
          brand: 'VW',
          model: 'Gol',
          year: '2015',
          plate: 'ABC-1234',
        },
        {
          brand: 'Ford',
          model: 'Wrangler',
          year: '2012',
          plate: 'CDE-1234',
        },
      ],
      deliveries: [
        {
          finalAddress: {
            lat: -58.7523,
            long: -87.2181,
          },
          lastAddress: {
            lat: -58.6521,
            long: -87.1162,
          },
          total: {
            distance: 2,
            duration: 2,
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
        {
          finalAddress: {
            lat: -58.7521,
            long: -87.2162,
          },
          lastAddress: {
            lat: -58.7523,
            long: -87.2181,
          },
          total: {
            distance: 3,
            duration: 2,
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
      ],
    }
    const fromOriginToDestinySpy = jest.spyOn(
      calculateDistanceAndDurationStub,
      'fromOriginToDestiny',
    )
    fromOriginToDestinySpy
      .mockResolvedValueOnce({
        distance: 3,
        duration: 3,
      })
      .mockResolvedValueOnce({
        distance: 2,
        duration: 1,
      })
      .mockResolvedValueOnce({
        distance: 2,
        duration: 2,
      })
      .mockResolvedValueOnce({
        distance: 3,
        duration: 2,
      })
    const saveSpy = jest.spyOn(serviceRequestRepositoryStub, 'save')
    await sut.create(fakeDto)
    expect(saveSpy).toHaveBeenCalled()
    expect(saveSpy).toHaveBeenCalledWith(expectedServiceRequest)
  })
})
