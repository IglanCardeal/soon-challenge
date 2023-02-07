import {
  Body,
  Controller,
  Post,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  InvalidFinalAddressError,
  InvalidServiceType,
  InvalidVehiclesQtyError,
} from 'src/domain/errors'
import { logger } from '../logger'
import { ControllerCreateRequestServiceDTO } from './dto/create-request-service-dto'
import { createServiceRequestUseCaseFactory } from './factories'
import { createRandomCompanyClient } from '../repository/utils'

const createServiceRequestUseCase = createServiceRequestUseCaseFactory()

@Controller('api/v1/service-request')
export class AppController {
  @Post('create')
  async create(@Body() request: ControllerCreateRequestServiceDTO) {
    logger.log(request)

    try {
      await createRandomCompanyClient(request.company.name, request.company.id)

      const result = await createServiceRequestUseCase.create(request)

      if (
        result instanceof InvalidVehiclesQtyError ||
        result instanceof InvalidServiceType ||
        result instanceof InvalidFinalAddressError
      ) {
        return new BadRequestException(result.message)
      }

      return {
        service: result,
      }
    } catch (error: any) {
      logger.error(error.stack)
      return new InternalServerErrorException()
    }
  }
}
