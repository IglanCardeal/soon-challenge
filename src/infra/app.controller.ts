import { Body, Controller, Post } from '@nestjs/common'
import { ControllerCreateRequestServiceDTO } from './dto/create-request-service-dto'

@Controller('api/v1/service-request')
export class AppController {
  @Post('create')
  create(@Body() request: ControllerCreateRequestServiceDTO) {
    // eslint-disable-next-line no-console
    console.dir(request.deliveries, { depth: Infinity })
    return {
      message: 'Service Created',
    }
  }
}
