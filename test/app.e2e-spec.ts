import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/infra/app.module'

const makeFakeRequest = () => ({
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

describe('Service Request Routes - api/v1/service-request (e2e)', () => {
  let app: INestApplication
  const baseUrl = `/api/v1/service-request`

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it(`${baseUrl}/create (POST)`, () => {
    return request(app.getHttpServer())
      .post(`${baseUrl}/create`)
      .send(makeFakeRequest())
      .expect(201)
      .expect({
        message: 'Service Created',
      })
  })
})
