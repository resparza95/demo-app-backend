import Entry from '../models/entry.model';

export class EntryRepository {
  async saveItems(items: Omit<Entry, 'id' | 'createdAt'>[]): Promise<void> {
    await Entry.bulkCreate(items);
  }

  async getAllItems(): Promise<Entry[]> {
    return await Entry.findAll({ order: [['createdAt', 'DESC']] });
  }

  async clearAllItems(): Promise<void> {
    await Entry.destroy({ where: {} });
  }
}