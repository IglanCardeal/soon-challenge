const serviceRequestCreated = {
  collectionAddress: { lat: -58.6521, long: -87.1162 },
  company: { id: expect.any(Number), name: 'test' },
  serviceType: 'guincho',
  createdAt: expect.any(Date),
  total: { distance: 5, duration: 4, servicePrice: 25.5 },
  vehicles: [
    { brand: 'VW', model: 'Gol', year: '2015', plate: 'ABC-1234' },
    {
      brand: 'Ford',
      model: 'Wrangler',
      year: '2012',
      plate: 'CDE-1234',
    },
  ],
  deliveries: [
    {
      finalAddress: { lat: -58.7523, long: -87.2181 },
      lastAddress: { lat: -58.6521, long: -87.1162 },
      total: { distance: 2, duration: 2 },
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
      finalAddress: { lat: -58.7521, long: -87.2162 },
      lastAddress: { lat: -58.7523, long: -87.2181 },
      total: { distance: 3, duration: 2 },
      vehicles: [
        { brand: 'VW', model: 'Gol', year: '2015', plate: 'ABC-1234' },
      ],
    },
  ],
  id: expect.any(String),
}

const findExpectation = {
  id: expect.any(String),
  serviceType: 'guincho',
  createdAt: expect.any(Date),
  total: { distance: 5, duration: 4, servicePrice: 25.5 },
  collectionAddress: { lat: -58.6521, long: -87.1162 },
  deliveries: [
    {
      finalAddress: { lat: -58.7523, long: -87.2181 },
      lastAddress: { lat: -58.6521, long: -87.1162 },
      total: { distance: 2, duration: 2 },
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
      finalAddress: { lat: -58.7521, long: -87.2162 },
      lastAddress: { lat: -58.7523, long: -87.2181 },
      total: { distance: 3, duration: 2 },
      vehicles: [
        { brand: 'VW', model: 'Gol', year: '2015', plate: 'ABC-1234' },
      ],
    },
  ],
  vehicles: [
    { year: '2015', brand: 'VW', model: 'Gol', plate: 'ABC-1234' },
    {
      year: '2012',
      brand: 'Ford',
      model: 'Wrangler',
      plate: 'CDE-1234',
    },
  ],
  company: {
    id: expect.any(Number),
    name: 'test',
  },
}

export { serviceRequestCreated, findExpectation }
