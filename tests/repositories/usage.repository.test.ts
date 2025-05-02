import UsageItem from '../../src/models/usage.model';
import sequelize from '../../src/config/db.config';

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reset the database before tests
});

afterAll(async () => {
  await sequelize.close(); // Close the database connection after all tests
});

describe('UsageRepository', () => {
  it('should create a new usage item record', async () => {
    const usageItem = await UsageItem.create({
      appliedFilter: '> than 5 words',
      appliedOrder: 'Ordered by commentCount column DESC',
    });
    expect(usageItem).toBeDefined();
    expect(usageItem.appliedFilter).toBe('> than 5 words');
    expect(usageItem.appliedOrder).toBe('Ordered by commentCount column DESC');
  });

  it('should return list of usage records', async () => {
    const usageItem = await UsageItem.create({
      appliedFilter: '> than 5 words',
      appliedOrder: 'Ordered by commentCount column DESC',
    });

    const usageItems = await UsageItem.findAll({ order: [['createdAt', 'DESC']] });
    expect(usageItems).toBeDefined();
    expect(usageItems.length).toBeGreaterThan(0);
  });

});