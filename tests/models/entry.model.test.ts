import Entry from '../../src/models/entry.model';
import sequelize from '../../src/config/db.config';

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reset the database before tests
});

afterAll(async () => {
  await sequelize.close(); // Close the database connection after all tests
});

describe('EntryModel', () => {
  it('should enforce not null constraint on position', async () => {
    await Entry.create({ position: 1, title: 'Entry A'});
    await expect(
      Entry.create({ position: undefined, title: 'Entry B'})
    ).rejects.toThrow();
  });

  it('should enforce not null constraint on title', async () => {
    await Entry.create({ position: 2, title: 'Entry B'});
    await expect(
      Entry.create({ position: 3, title: undefined})
    ).rejects.toThrow();
  });

});