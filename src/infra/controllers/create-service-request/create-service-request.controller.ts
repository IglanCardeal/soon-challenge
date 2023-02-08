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
import { ControllerCreateRequestServiceDTO } from './create-service-request-dto'
import { logger } from 'src/infra/logger'
import { createServiceRequestUseCaseFactory } from './create-service-request-usecase-factory'

const createServiceRequestUseCase = createServiceRequestUseCaseFactory()

@Controller('api/v1/service-request')
export class CreateServiceController {
  @Post('create')
  async create(@Body() request: ControllerCreateRequestServiceDTO) {
    logger.log('[REQUEST]: ', request)

    try {
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
