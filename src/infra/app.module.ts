import { Module } from '@nestjs/common'
import {
  FindCompanyServicesController,
  CreateServiceController,
  FindServiceRequestController,
} from './controllers'
import { PingTestController } from './controllers/ping/ping-test.controller'

@Module({
  imports: [],
  controllers: [
    FindCompanyServicesController,
    CreateServiceController,
    FindServiceRequestController,
    PingTestController,
  ],
  providers: [],
})
export class AppModule {}
