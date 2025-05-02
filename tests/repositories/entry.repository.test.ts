import sequelize from '../../src/config/db.config';
import Entry from '../../src/models/entry.model';

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reset the database before tests
});

afterAll(async () => {
  await sequelize.close(); // Close the database connection after all tests
});

describe('EntryRepository', () => {
  it('should create multiple entries using bulkCreate', async () => {
    const entriesData = [
      { position: 1, title: 'Entry A', points: 5, commentCount: 1 },
      { position: 2, title: 'Entry B', points: 8, commentCount: 3 },
      { position: 3, title: 'Entry C', points: 2, commentCount: 0 },
    ];

    const createdEntries = await Entry.bulkCreate(entriesData);

    expect(createdEntries).toBeDefined();
    expect(createdEntries.length).toBeGreaterThan(0);
    expect(createdEntries[0].title).toBe('Entry A');
  });

  it('should return list of entries', async () => {
    const entries = await Entry.findAll({ order: [['createdAt', 'DESC']] });
    expect(entries).toBeDefined();
    expect(entries.length).toBeGreaterThan(0);
  });

});