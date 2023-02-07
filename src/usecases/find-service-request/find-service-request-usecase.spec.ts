import {
  FindServiceRequestRepository,
  ServiceRequest,
} from './find-service-request-contracts'
import { expectedServiceRequest } from './expectations'
import { FindServiceRequestUseCase } from './find-service-request-usecase'

class FindServiceRequestRepositoryStub implements FindServiceRequestRepository {
  async findById(id: string): Promise<ServiceRequest | null> {
    return {
      id,
      ...expectedServiceRequest,
    } as ServiceRequest
  }
}

const makeSut = () => {
  const findServiceRequestRepositoryStub =
    new FindServiceRequestRepositoryStub()
  return {
    sut: new FindServiceRequestUseCase(findServiceRequestRepositoryStub),
    findServiceRequestRepositoryStub,
  }
}

describe('FindServiceRequestUseCase', () => {
  const { sut, findServiceRequestRepositoryStub } = makeSut()

  it('Should call FindServiceRequestRepository with correct service id', async () => {
    const findByIdSpy = jest.spyOn(findServiceRequestRepositoryStub, 'findById')
    await sut.find('A123')
    expect(findByIdSpy).toHaveBeenCalledWith('A123')
  })

  it('Should throw if FindServiceRequestRepository throws', async () => {
    jest
      .spyOn(findServiceRequestRepositoryStub, 'findById')
      .mockRejectedValueOnce(new Error())
    await expect(sut.find('A123')).rejects.toThrow(new Error())
  })

  it('Should return the service request data on success', async () => {
    const result = await sut.find('A123')
    expect(result).toEqual({
      ...expectedServiceRequest,
      id: 'A123',
    })
  })
})
