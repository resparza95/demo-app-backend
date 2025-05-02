import UsageItem from '../models/usage.model';

export class UsageRepository {
  async saveItem(item: Omit<UsageItem, 'id' | 'createdAt'>): Promise<void> {
    await UsageItem.create(item);
  }

  async getAllItems(): Promise<UsageItem[]> {
    return await UsageItem.findAll({ order: [['createdAt', 'DESC']] });
  }
}