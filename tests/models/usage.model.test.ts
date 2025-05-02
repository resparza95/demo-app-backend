import UsageItem from '../../src/models/usage.model';
import sequelize from '../../src/config/db.config';

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reset the database before tests
});

afterAll(async () => {
  await sequelize.close(); // Close the database connection after all tests
});

describe('UsageItemModel', () => {
  it('should enforce not null constraint on appliedFilter', async () => {
    //await UsageItem.create({ appliedFilter: '> than 5 words', appliedOrder: 'Ordered by commentCount column DESC'});
    await expect(
      UsageItem.create({ appliedFilter: undefined, appliedOrder: 'Ordered by commentCount column DESC'})
    ).rejects.toThrow();
  });

  it('should enforce not null constraint on appliedOrder', async () => {
    //await UsageItem.create({ appliedFilter: '> than 5 words', appliedOrder: 'Ordered by commentCount column DESC'});
    await expect(
      UsageItem.create({ appliedFilter: '<= than 5 words', appliedOrder: undefined })
    ).rejects.toThrow();
  });

});