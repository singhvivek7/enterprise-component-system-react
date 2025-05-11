import { RowData } from './types';

export const generateMockData = (count: number): RowData[] => {
  const roles = ['Developer', 'Designer', 'Manager', 'Analyst'];
  const statuses = ['Active', 'Inactive', 'Pending'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston'];
  const states = ['NY', 'CA', 'IL', 'TX'];
  const countries = ['USA', 'Canada', 'UK', 'Germany'];

  const data: RowData[] = [];

  for (let i = 1; i <= count; i++) {
    const createdAt = new Date(Date.now() - Math.random() * 1e10);
    const updatedAt = new Date(createdAt.getTime() + Math.random() * 1e6);

    data.push({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      phone: `+1-555-01${(1000 + i).toString().slice(-4)}`,
      address: `${i} Main Street`,
      city: cities[Math.floor(Math.random() * cities.length)],
      state: states[Math.floor(Math.random() * states.length)],
      zip: `${10000 + (i % 90000)}`,
      country: countries[Math.floor(Math.random() * countries.length)],
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      role: roles[Math.floor(Math.random() * roles.length)],
      lastLogin: new Date(
        updatedAt.getTime() + Math.random() * 1e6
      ).toISOString(),
      isVerified: Math.random() > 0.5 ? 'Yes' : 'No',
    });
  }

  return data;
};
