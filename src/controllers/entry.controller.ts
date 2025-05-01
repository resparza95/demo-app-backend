import { Request, Response } from 'express';
import axios from 'axios';
import cheerio from 'cheerio';
import { EntryRepository } from '../repositories/entry.repository';

export class EntryController {
  private entryRepository: EntryRepository;
  private targetUrl: string;

  constructor(entryRepository: EntryRepository, targetUrl: string) {
    this.entryRepository = entryRepository;
    this.targetUrl = targetUrl;
  }

  async crawlAndStore(req: Request, res: Response): Promise<void> {
    try {
      const response = await axios.get(this.targetUrl);

      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);
        const itemsToStore: any = [];

        $('.athing').each((i, element) => {
          const $row = $(element);
          const titleElement = $row.find('.titleline > a');
          const subtextElement = $row.next('.subtext');

          const title = titleElement.text();
          const pointsText = subtextElement.find('.score').text();
          const commentText = subtextElement.find('a:contains("comment")').text();

          const points = pointsText ? parseInt(pointsText.split(' ')[0]) : undefined;
          const commentCount = commentText ? parseInt(commentText.split('\u00a0')[0]) : undefined; // \u00a0 is &nbsp;

          itemsToStore.push({
            title,
            points,
            commentCount,
          });
        });

        await this.entryRepository.clearAllItems();
        await this.entryRepository.saveItems(itemsToStore);
        res.json({ message: 'Hacker News data crawled and stored successfully.', itemCount: itemsToStore.length });
      } else {
        res.status(response.status).send(`Failed to fetch URL: ${this.targetUrl}`);
      }
    } catch (error: any) {
      console.error('Error during crawling:', error);
      res.status(500).send(`An error occurred: ${error.message}`);
    }
  }

  async getItems(req: Request, res: Response): Promise<void> {
    try {
      const items = await this.entryRepository.getAllItems();
      res.json(items);
    } catch (error: any) {
      console.error('Error fetching items:', error);
      res.status(500).send(`Error fetching items: ${error.message}`);
    }
  }
}