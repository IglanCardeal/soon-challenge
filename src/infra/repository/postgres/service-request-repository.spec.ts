import { clearAllCompanyClients } from '../utils'
import { serviceRequestCreated } from './expectation'
import { makeFakeServiceRequest } from './faker'
import { PostgreServiceRequestRepository } from './service-request-repository'

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
})
