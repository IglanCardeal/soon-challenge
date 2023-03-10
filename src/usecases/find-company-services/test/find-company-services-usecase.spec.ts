import { InvalidStarAndEndDateError } from 'src/domain/errors'
import {
  FindCompanyServicesDTO,
  FindCompanyServicesRepository,
  FindCompanyServicesRepositoryResponse,
} from '../find-company-services-contracts'
import { FindCompanyServicesUseCase } from '../find-company-services-usecase'

class FindCompanyServicesRepositoryStub
  implements FindCompanyServicesRepository
{
  async findByCompanyId(
    _data: FindCompanyServicesDTO,
  ): Promise<FindCompanyServicesRepositoryResponse> {
    return {
      count: 1,
      totalPrice: 1,
    }
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
  const startDate = new Date()
  const endDate = new Date()
  startDate.setUTCHours(0, 0, 0, 0)
  endDate.setUTCHours(23, 59, 59, 999)
  const payload = {
    companyId,
    startDate,
    endDate,
  }

  const { sut, findCompanyServicesRepositoryStub } = makeSut()

  it('Should call FindCompanyServicesRepository with correct company id', async () => {
    const findByIdSpy = jest.spyOn(
      findCompanyServicesRepositoryStub,
      'findByCompanyId',
    )
    await sut.find(payload)
    expect(findByIdSpy).toHaveBeenCalledWith({
      companyId: 1,
      startDate: expect.any(Date),
      endDate: expect.any(Date),
    })
  })

  it('Should throw if FindCompanyServicesRepository throws', async () => {
    jest
      .spyOn(findCompanyServicesRepositoryStub, 'findByCompanyId')
      .mockRejectedValueOnce(new Error())
    await expect(sut.find(payload)).rejects.toThrow(new Error())
  })

  it('Should return InvalidStarAndEndDateError when invalid dates', async () => {
    const invalidDate = new Date()
    const result = await sut.find({
      ...payload,
      startDate: invalidDate,
      endDate: invalidDate,
    })
    expect(result).toEqual(new InvalidStarAndEndDateError())
  })

  it('Should return all the services data on success', async () => {
    const result = await sut.find(payload)
    expect(result).toEqual({
      total: {
        count: 1,
        fullPrice: 1,
      },
    })
  })
})
