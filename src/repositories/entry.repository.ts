import Entry from '../models/entry.model';
import { Sequelize } from 'sequelize';
export class EntryRepository {
  async saveEntries(items: Omit<Entry, 'id' | 'createdAt'>[]): Promise<void> {
    await Entry.bulkCreate(items);
  }

  async getAllEntries(): Promise<Entry[]> {
    return await Entry.findAll({ order: [['createdAt', 'DESC']] });
  }

  async clearAllEntries(): Promise<void> {
    await Entry.destroy({ where: {} });
  }

  async findEntriesWithTitleWordCount(minWords: number, comparator: string = '>', orderField: string = 'DESC'): Promise<Entry[]> {
    return await Entry.findAll({
      where: Sequelize.literal(`LENGTH(TRIM(title)) - LENGTH(REPLACE(TRIM(title), ' ', '')) + 1 ${comparator} ${minWords}`),
      order: [[orderField, 'DESC']],
    });
  }

}