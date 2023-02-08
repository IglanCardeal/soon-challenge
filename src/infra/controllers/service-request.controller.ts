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
  InvalidStarAndEndDateError,
  InvalidVehiclesQtyError,
} from 'src/domain/errors'
import { logger } from '../logger'
import {
  ControllerCreateRequestServiceDTO,
  FindByCompanyParamsDTO,
  FindParamsDTO,
} from './dto/create-request-service-dto'
import {
  createServiceRequestUseCaseFactory,
  findCompanyServicesUseCaseFactory,
  findServiceRequestUseCaseFactory,
} from './factories'

const createServiceRequestUseCase = createServiceRequestUseCaseFactory()
const findServiceRequestUseCase = findServiceRequestUseCaseFactory()
const findCompanyServicesUseCase = findCompanyServicesUseCaseFactory()

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

  @Get('company')
  async findByCompany(@Body() request: FindByCompanyParamsDTO) {
    logger.log('[REQUEST]: ', request, findCompanyServicesUseCase.find)

    try {
      const result = await findCompanyServicesUseCase.find({
        ...request,
        endDate: new Date(request.endDate),
        startDate: new Date(request.startDate),
      })

      if (result instanceof InvalidStarAndEndDateError) {
        return new BadRequestException(result.message)
      }

      return result
    } catch (error: any) {
      logger.error(error.stack)
      return new InternalServerErrorException()
    }
  }
}
