import {
  CalculateDistanceAndDurationProvider,
  CalculateDistanceAndDurationProviderResponse,
} from 'src/domain/contracts'
import { Address } from 'src/domain/model/service-request'
import axios from 'axios'

export class GoogleCalculateDistanceAndDurationProvider
  implements CalculateDistanceAndDurationProvider
{
  constructor(
    private readonly googleApiKey: string,
    private readonly url: string,
  ) {}

  async fromOriginToDestiny(
    origin: Address,
    destiny: Address,
  ): Promise<CalculateDistanceAndDurationProviderResponse> {
    const originString = `${origin.lat},${origin.long}`
    const destinationString = `${destiny.lat},${destiny.long}`
    const { data } = await axios.get(this.url, {
      params: {
        origins: originString,
        destinations: destinationString,
        key: this.googleApiKey,
      },
    })

    if (!data) {
      throw new Error('No data returned from google API.')
    }

    const [
      {
        elements: [result],
      },
    ] = data.rows

    return {
      distance: result.distance.value,
      duration: result.duration.value,
    }
  }
}
