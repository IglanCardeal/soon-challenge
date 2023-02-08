import { clearAllCompanyClients } from '../../utils'
import { findExpectation, serviceRequestCreated } from './expectation'
import { makeFakeServiceRequest } from './faker'
import { PostgreServiceRequestRepository } from '../service-request-repository'

const makeSut = () => new PostgreServiceRequestRepository()

describe('PostgreServiceRequestRepository', () => {
  const sut = makeSut()

  beforeEach(async () => {
    await clearAllCompanyClients()
  })

  it('Should create a service request on success', async () => {
    const res = await sut.save(await makeFakeServiceRequest())
    expect(res).toEqual(serviceRequestCreated)
  })

  it('Should find a service request by id success', async () => {
    const service = await sut.save(await makeFakeServiceRequest())
    const result = await sut.findById(service.id)
    expect(result).toEqual(findExpectation)
  })

  it('Should return all services by company id and filtered by date on success', async () => {
    const startDate = new Date()
    const endDate = new Date()
    startDate.setUTCHours(0, 0, 0, 0)
    endDate.setUTCHours(23, 59, 59, 999)
    const payload = {
      companyId: 1,
      startDate,
      endDate,
    }
    await sut.save(await makeFakeServiceRequest())
    const result = await sut.findByCompanyId(payload)
    expect(result).toEqual({
      count: expect.any(Number),
      totalPrice: expect.any(Number),
    })
    expect(result.count).toBeGreaterThan(0)
    expect(result.totalPrice).toBeGreaterThan(0)
  })

  it('Should return an empty result for the dates', async () => {
    const startDate = new Date()
    const endDate = new Date()
    startDate.setMonth(startDate.getMonth() + 1)
    endDate.setFullYear(endDate.getFullYear() + 1)
    const payload = {
      companyId: 1,
      startDate,
      endDate,
    }
    await sut.save(await makeFakeServiceRequest())
    const result = await sut.findByCompanyId(payload)
    expect(result).toEqual({
      totalPrice: 0,
      count: 0,
    })
  })
})
