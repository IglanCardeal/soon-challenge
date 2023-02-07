import { PrismaClient } from '@prisma/client'
import { ServiceRequestRepository } from 'src/domain/contracts'
import { ServiceRequest } from 'src/domain/model/service-request'

const prisma = new PrismaClient()

export class PostgreServiceRequestRepository
  implements ServiceRequestRepository
{
  async save(
    serviceRequest: Omit<ServiceRequest, 'id'>,
  ): Promise<ServiceRequest> {
    const {
      collectionAddress,
      createdAt,
      deliveries,
      serviceType,
      total,
      vehicles,
    } = serviceRequest

    const resp = await prisma.serviceRequest.create({
      data: {
        companyId: +serviceRequest.company.id,
        collectionAddress,
        createdAt,
        deliveries: JSON.stringify(deliveries),
        serviceType,
        total,
        vehicles,
      },
    })

    return { ...serviceRequest, id: resp.id }
  }
}
