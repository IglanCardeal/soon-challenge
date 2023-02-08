import { Module } from '@nestjs/common'
import {
  FindCompanyServicesController,
  CreateServiceController,
  FindServiceRequestController,
} from './controllers'

@Module({
  imports: [],
  controllers: [
    FindCompanyServicesController,
    CreateServiceController,
    FindServiceRequestController,
  ],
  providers: [],
})
export class AppModule {}
