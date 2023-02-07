import {
  InvalidFinalAddressError,
  InvalidServiceType,
  InvalidVehiclesQtyError,
} from 'src/domain/errors'
import { CreateServiceRequestUseCase } from '../create'
import {
  CreateServiceRequestDTO,
  Address,
  ServiceRequest,
  CalculateDistanceAndDurationProvider,
  ServiceRequestRepository,
  DomainConstants,
  CalculateDistanceAndDurationProviderResponse,
} from '../create-contracts'
import { makeFakeDomainConstants, makeFakeDto } from './fakers'
import { expectedServiceRequest } from './expectations'

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
    expect(result).toEqual(
      new InvalidServiceType('invalid', ['guincho', 'cegonha']),
    )
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
    expect(saveSpy).toHaveBeenCalledWith(expectedServiceRequest)
  })
})
