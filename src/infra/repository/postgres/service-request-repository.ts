import { PrismaClient } from '@prisma/client'
import {
  FindServiceRequestRepository,
  ServiceRequestRepository,
} from 'src/domain/contracts'
import { ServiceRequest } from 'src/domain/model/service-request'

const prisma = new PrismaClient()

export class PostgreServiceRequestRepository
  implements ServiceRequestRepository, FindServiceRequestRepository
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

  async findById(id: string): Promise<ServiceRequest | null> {
    const resp = await prisma.serviceRequest.findUnique({
      where: {
        id,
      },
      include: {
        company: true,
      },
    })
    if (!resp) return null

    return {
      id: resp.id,
      serviceType: resp.serviceType,
      createdAt: resp.createdAt,
      total: resp.total,
      collectionAddress: resp.collectionAddress,
      deliveries: JSON.parse(resp.deliveries as string),
      vehicles: resp.vehicles,
      company: resp.company,
    } as any
  }
}
