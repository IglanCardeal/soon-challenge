const expectedServiceRequest = {
  collectionAddress: {
    lat: -58.6521,
    long: -87.1162,
  },
  company: {
    id: 'company_id',
    name: 'Wells',
  },
  serviceType: 'guincho',
  createdAt: expect.any(Date),
  total: {
    distance: 5,
    duration: 4,
    servicePrice: 25.5,
  },
  vehicles: [
    {
      brand: 'VW',
      model: 'Gol',
      year: '2015',
      plate: 'ABC-1234',
    },
    {
      brand: 'Ford',
      model: 'Wrangler',
      year: '2012',
      plate: 'CDE-1234',
    },
  ],
  deliveries: [
    {
      finalAddress: {
        lat: -58.7523,
        long: -87.2181,
      },
      lastAddress: {
        lat: -58.6521,
        long: -87.1162,
      },
      total: {
        distance: 2,
        duration: 2,
      },
      vehicles: [
        {
          brand: 'Ford',
          model: 'Wrangler',
          year: '2012',
          plate: 'CDE-1234',
        },
      ],
    },
    {
      finalAddress: {
        lat: -58.7521,
        long: -87.2162,
      },
      lastAddress: {
        lat: -58.7523,
        long: -87.2181,
      },
      total: {
        distance: 3,
        duration: 2,
      },
      vehicles: [
        {
          brand: 'VW',
          model: 'Gol',
          year: '2015',
          plate: 'ABC-1234',
        },
      ],
    },
  ],
}

export { expectedServiceRequest }
