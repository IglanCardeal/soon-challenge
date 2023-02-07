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

@Controller('api/v1/service-request')
export class AppController {
  constructor(
    private readonly createServiceRequestUseCase = createServiceRequestUseCaseFactory(),
  ) {}

  @Post('create')
  async create(@Body() request: ControllerCreateRequestServiceDTO) {
    logger.log(request)

    try {
      const result = await this.createServiceRequestUseCase.create(request)

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
