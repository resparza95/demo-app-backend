import express from 'express';
import { EntryController } from '../controllers/entry.controller';
import { EntryRepository } from '../repositories/entry.repository';
import { UsageRepository } from '../repositories/usage.repository';

const router = express.Router();
const targetUrl = 'https://news.ycombinator.com';
const entriesRepository = new EntryRepository();
const usageRepository = new UsageRepository();
const entriesController = new EntryController(entriesRepository, targetUrl, usageRepository);

router.get('/crawl', entriesController.crawlAndStore.bind(entriesController));
router.get('/list', entriesController.getEntries.bind(entriesController));
router.post('/listFiltered', entriesController.getFilteredEntriesByWords.bind(entriesController));
router.delete('/delete', entriesController.removeEntries.bind(entriesController));

export default router;