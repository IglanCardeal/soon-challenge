import { Body, Controller, Post } from '@nestjs/common'

@Controller('api/v1/service-request')
export class AppController {
  @Post('create')
  create(@Body() _request: any) {
    return {
      message: 'Service Created',
    }
  }
}
