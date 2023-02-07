import * as nock from 'nock'
import { Address } from 'src/domain/model/service-request'
import { config } from 'src/infra/config'
import { GoogleCalculateDistanceAndDurationProvider } from './calculate-distance-provider'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mockJsonResponse = require('./mock.json')

const googleApiKey = 'test'
const googleUrl = config.env.GOOGLE_CLOUD_API_URL

nock(googleUrl)
  .get(
    `?origins=-1.369406,-48.380052&destinations=-1.368226,-48.377295&key=${googleApiKey}`,
  )
  .reply(200, mockJsonResponse)

const makeSut = () =>
  new GoogleCalculateDistanceAndDurationProvider(googleApiKey, googleUrl)

describe('GoogleCalculateDistanceAndDurationProvider', () => {
  const origin: Address = {
    lat: -1.369406,
    long: -48.380052,
  }
  const destiny: Address = {
    lat: -1.368226,
    long: -48.377295,
  }
  const sut = makeSut()

  it('Should return the correct distance and duration on success', async () => {
    const result = await sut.fromOriginToDestiny(origin, destiny)
    expect(result).toEqual({
      distance: 2132,
      duration: 231,
    })
  })
})