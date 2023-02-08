import { FindCompanyServicesRepository } from 'src/domain/contracts'
import { ServiceRequest } from 'src/domain/model/service-request'
import { FindCompanyServicesUseCase } from '../find-company-services-usecase'
import { makeFakeServiceData } from './fakers'

class FindCompanyServicesRepositoryStub
  implements FindCompanyServicesRepository
{
  async findById(_companyId: number): Promise<ServiceRequest[]> {
    return [makeFakeServiceData()]
  }
}

const makeSut = () => {
  const findCompanyServicesRepositoryStub =
    new FindCompanyServicesRepositoryStub()
  return {
    sut: new FindCompanyServicesUseCase(findCompanyServicesRepositoryStub),
    findCompanyServicesRepositoryStub,
  }
}

describe('FindCompanyServicesUseCase', () => {
  const companyId = 1
  const { sut, findCompanyServicesRepositoryStub } = makeSut()

  it('Should call FindCompanyServicesRepository with correct company id', async () => {
    const findByIdSpy = jest.spyOn(
      findCompanyServicesRepositoryStub,
      'findById',
    )
    await sut.find(companyId)
    expect(findByIdSpy).toHaveBeenCalledWith(1)
  })
})
