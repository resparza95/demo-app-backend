import express from 'express';
import { EntryController } from '../controllers/entry.controller';
import { EntryRepository } from '../repositories/entry.repository';

const router = express.Router();
const targetUrl = 'https://news.ycombinator.com';
const entriesRepository = new EntryRepository();
const entriesController = new EntryController(entriesRepository, targetUrl);

router.get('/crawl', entriesController.crawlAndStore.bind(entriesController));
router.get('/list', entriesController.getItems.bind(entriesController));

export default router;