import { Request, Response } from 'express';
import { UsageRepository } from '../repositories/usage.repository';

export class UsageController {
  private usageRepository: UsageRepository;

  constructor(usageRepository: UsageRepository) {
    this.usageRepository = usageRepository;
  }

  async getEntries(req: Request, res: Response): Promise<void> {
    try {
      const items = await this.usageRepository.getAllItems();
      res.json(items);
    } catch (error: any) {
      console.error('Error fetching entries:', error);
      res.status(500).send(`Error fetching entries: ${error.message}`);
    }
  }

}