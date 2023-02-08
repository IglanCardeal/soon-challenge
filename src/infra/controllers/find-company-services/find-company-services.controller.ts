import {
  Body,
  Controller,
  BadRequestException,
  InternalServerErrorException,
  Get,
} from '@nestjs/common'
import { InvalidStarAndEndDateError } from 'src/domain/errors'
import { logger } from 'src/infra/logger'
import { FindByCompanyParamsDTO } from './find-company-services-dto'
import { findCompanyServicesUseCaseFactory } from './find-company-services-usecase-factory'

const findCompanyServicesUseCase = findCompanyServicesUseCaseFactory()

@Controller('api/v1/service-request')
export class FindCompanyServicesController {
  @Get('company')
  async findByCompany(@Body() request: FindByCompanyParamsDTO) {
    logger.log('[REQUEST]: ', request)

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
