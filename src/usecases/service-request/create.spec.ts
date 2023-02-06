import { InvalidServiceType, InvalidVehiclesQtyError } from 'src/domain/errors'
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
    lat: '-58.6521',
    long: '-87.1162',
  },
  deliveries: [
    {
      finalAddress: {
        lat: '-58.7521',
        long: '-87.2162',
      },
    },
  ],
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
    {
      brand: 'Ford',
      model: 'Wrangler',
      year: '2015',
      plate: 'ZXW-1234',
    },
  ],
})

describe('CreateServiceRequestUseCase', () => {
  const { sut } = makeSut()

  it('Should return InvalidServiceType when invalid service type', async () => {
    const result = await sut.create({
      ...makeFakeDto(),
      serviceType: 'invalid' as any,
    })
    expect(result).toBeInstanceOf(InvalidServiceType)
  })

  it('Should return InvalidVehiclesQtyError error when more than 2 vehicles for a service type "guincho"', async () => {
    const result = await sut.create(makeFakeDto())
    expect(result).toBeInstanceOf(InvalidVehiclesQtyError)
  })
})
