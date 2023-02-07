import {
  Body,
  Controller,
  Post,
  BadRequestException,
  InternalServerErrorException,
  Param,
  Get,
} from '@nestjs/common'
import {
  InvalidFinalAddressError,
  InvalidServiceType,
  InvalidVehiclesQtyError,
} from 'src/domain/errors'
import { logger } from '../logger'
import {
  ControllerCreateRequestServiceDTO,
  FindParams,
} from './dto/create-request-service-dto'
import {
  createServiceRequestUseCaseFactory,
  findServiceRequestUseCaseFactory,
} from './factories'

const createServiceRequestUseCase = createServiceRequestUseCaseFactory()
const findServiceRequestUseCase = findServiceRequestUseCaseFactory()

@Controller('api/v1/service-request')
export class AppController {
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

  @Get('find/:id')
  async find(@Param() request: FindParams) {
    logger.log('[REQUEST]: ', request)

    try {
      return {
        service: await findServiceRequestUseCase.find(request.id),
      }
    } catch (error: any) {
      logger.error(error.stack)
      return new InternalServerErrorException()
    }
  }
}
