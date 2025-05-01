import { Request, Response } from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
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
          const positionElement = $row.find('.rank');
          const titleElement = $row.find('.titleline > a');
          const subtextElement = $row.next();

          const position = positionElement.text();
          const title = titleElement.text();
          const pointsText = subtextElement.find('.subtext > .subline > .score').text();
          const commentText = subtextElement.find('a:contains("comment")').text();

          const points = pointsText ? parseInt(pointsText.split(' ')[0]) : undefined;
          const commentCount = commentText ? parseInt(commentText.split('\u00a0')[0]) : undefined; // \u00a0 is &nbsp;

          itemsToStore.push({
            position,
            title,
            points,
            commentCount,
          });
        });

        await this.entryRepository.clearAllItems();
        await this.entryRepository.saveItems(itemsToStore);
        res.json({ message: 'Entries stored successfully.', itemCount: itemsToStore.length });
      } else {
        res.status(response.status).send(`Failed to fetch URL: ${this.targetUrl}`);
      }
    } catch (error: any) {
      console.error('Error during crawling:', error);
      res.status(500).send(`An error occurred: ${error.message}`);
    }
  }

  async getEntries(req: Request, res: Response): Promise<void> {
    try {
      const items = await this.entryRepository.getAllItems();
      res.json(items);
    } catch (error: any) {
      console.error('Error fetching entries:', error);
      res.status(500).send(`Error fetching entries: ${error.message}`);
    }
  }

  async removeEntries(req: Request, res: Response): Promise<void> {
    try {
      await this.entryRepository.clearAllItems();
      res.json({ message: 'Entries deleted successfully.'});
    } catch (error: any) {
      console.error('Error deleting entries:', error);
      res.status(500).send(`Error deleting entries: ${error.message}`);
    }
  }

  async getFilteredEntriesByWords (req: Request, res: Response): Promise<void>  {
    try {
      const minWords = 5;
      const entries = await this.entryRepository.findEntriesWithTitleWordCount(minWords, req.body.comparator, req.body.orderField);
      res.status(200).json(entries);
    } catch (error: any) {
      console.error('Error fetching filtered entries:', error);
      res.status(500).json({ message: 'Failed to fetch filtered entries' });
    }
  }
}