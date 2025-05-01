import UsageItem from '../models/usage.model';

export class UsageRepository {
  async saveItem(item: Omit<UsageItem, 'id' | 'createdAt'>): Promise<void> {
    const newItem = UsageItem.build(item);
    await newItem.save();
  }

  async getAllItems(): Promise<UsageItem[]> {
    return await UsageItem.findAll({ order: [['createdAt', 'DESC']] });
  }
}