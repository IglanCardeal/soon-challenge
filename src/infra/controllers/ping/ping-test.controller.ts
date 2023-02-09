import { Controller, Get } from '@nestjs/common'

@Controller('ping')
export class PingTestController {
  @Get()
  async ping() {
    return {
      message: 'Pong!',
    }
  }
}
