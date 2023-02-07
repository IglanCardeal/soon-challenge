import {
  clearAllCompanyClients,
  createRandomCompanyClient,
  findAllCompanyClients,
} from '.'

describe('PostgreServiceRequestRepository', () => {
  beforeEach(async () => {
    await clearAllCompanyClients()
  })

  it('Should create test a company client on success', async () => {
    const res = await createRandomCompanyClient('test', 1)
    expect(res).toEqual({
      id: expect.any(Number),
      name: 'test',
    })
  })

  it('Should find all clients on success', async () => {
    await createRandomCompanyClient('test', 1)
    await createRandomCompanyClient('test2', 2)
    const res = await findAllCompanyClients()
    expect(res).toEqual([
      {
        id: expect.any(Number),
        name: 'test',
      },
      {
        id: expect.any(Number),
        name: 'test2',
      },
    ])
  })

  it('Should remove all clients on success', async () => {
    await createRandomCompanyClient('test', 1)
    await clearAllCompanyClients()
    const res = await findAllCompanyClients()
    expect(res).toEqual([])
  })
})
