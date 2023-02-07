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

const expectedServiceRequestForCegonha = {
  collectionAddress: { lat: -58.6521, long: -87.1162 },
  company: { id: 'company_id', name: 'CarOps' },
  deliveries: [
    {
      finalAddress: { lat: -58.7523, long: -87.2181 },
      lastAddress: { lat: -58.6521, long: -87.1162 },
      vehicles: [
        {
          brand: 'Volvo',
          model: 'Safe',
          year: '2020',
          plate: 'VVA-7772',
        },
      ],
      total: { distance: 2, duration: 2 },
    },
    {
      finalAddress: { lat: -58.6222, long: -86.9999 },
      lastAddress: { lat: -58.7523, long: -87.2181 },
      vehicles: [
        {
          brand: 'Volvo',
          model: 'Safe',
          year: '2018',
          plate: 'BBS-7712',
        },
      ],
      total: { distance: 1, duration: 3 },
    },
    {
      finalAddress: { lat: -58.7521, long: -87.2162 },
      lastAddress: { lat: -58.6222, long: -86.9999 },
      vehicles: [
        { brand: 'VW', model: 'Gol', year: '2015', plate: 'ABC-1234' },
        {
          brand: 'Honda',
          model: 'Civic',
          year: '2019',
          plate: 'HHH-4321',
        },
      ],
      total: { distance: 4, duration: 8 },
    },
  ],
  serviceType: 'cegonha',
  total: { distance: 7, duration: 13, servicePrice: 74.5 },
  vehicles: [
    { brand: 'VW', model: 'Gol', year: '2015', plate: 'ABC-1234' },
    { brand: 'Honda', model: 'Civic', year: '2019', plate: 'HHH-4321' },
    { brand: 'Volvo', model: 'Safe', year: '2020', plate: 'VVA-7772' },
    { brand: 'Volvo', model: 'Safe', year: '2018', plate: 'BBS-7712' },
  ],
  createdAt: expect.any(Date),
}

const expectedServiceRequestForCegonhaWithBasePrice = {
  collectionAddress: { lat: -58.6521, long: -87.1162 },
  company: { id: 'company_id', name: 'CarOps' },
  deliveries: [
    {
      finalAddress: { lat: -58.7523, long: -87.2181 },
      lastAddress: { lat: -58.6521, long: -87.1162 },
      vehicles: [
        {
          brand: 'Volvo',
          model: 'Safe',
          year: '2020',
          plate: 'VVA-7772',
        },
      ],
      total: { distance: 1, duration: 2 },
    },
    {
      finalAddress: { lat: -58.6222, long: -86.9999 },
      lastAddress: { lat: -58.7523, long: -87.2181 },
      vehicles: [
        {
          brand: 'Volvo',
          model: 'Safe',
          year: '2018',
          plate: 'BBS-7712',
        },
      ],
      total: { distance: 1, duration: 3 },
    },
    {
      finalAddress: { lat: -58.7521, long: -87.2162 },
      lastAddress: { lat: -58.6222, long: -86.9999 },
      vehicles: [
        { brand: 'VW', model: 'Gol', year: '2015', plate: 'ABC-1234' },
        {
          brand: 'Honda',
          model: 'Civic',
          year: '2019',
          plate: 'HHH-4321',
        },
      ],
      total: { distance: 1, duration: 8 },
    },
  ],
  serviceType: 'cegonha',
  total: { distance: 3, duration: 13, servicePrice: 30 },
  vehicles: [
    { brand: 'VW', model: 'Gol', year: '2015', plate: 'ABC-1234' },
    { brand: 'Honda', model: 'Civic', year: '2019', plate: 'HHH-4321' },
    { brand: 'Volvo', model: 'Safe', year: '2020', plate: 'VVA-7772' },
    { brand: 'Volvo', model: 'Safe', year: '2018', plate: 'BBS-7712' },
  ],
  createdAt: expect.any(Date),
}

export {
  expectedServiceRequest,
  expectedServiceRequestForCegonha,
  expectedServiceRequestForCegonhaWithBasePrice,
}
