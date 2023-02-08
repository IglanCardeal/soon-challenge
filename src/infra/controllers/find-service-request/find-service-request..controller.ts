import {
  InternalServerErrorException,
  Param,
  Get,
  Controller,
} from '@nestjs/common'
import { logger } from '../../logger'
import { FindParamsDTO } from './find-service-request-dto'
import { findServiceRequestUseCaseFactory } from './find-service-request-usecase-factory'

const findServiceRequestUseCase = findServiceRequestUseCaseFactory()

@Controller('api/v1/service-request')
export class FindServiceRequestController {
  @Get('find/:id')
  async find(@Param() request: FindParamsDTO) {
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
