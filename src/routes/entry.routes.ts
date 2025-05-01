import express from 'express';
import { EntryController } from '../controllers/entry.controller';
import { EntryRepository } from '../repositories/entry.repository';

const router = express.Router();
const targetUrl = 'https://news.ycombinator.com';
const hackerNewsRepository = new EntryRepository();
const hackerNewsController = new EntryController(hackerNewsRepository, targetUrl);

router.get('/crawl', hackerNewsController.crawlAndStore.bind(hackerNewsController));
router.get('/items', hackerNewsController.getItems.bind(hackerNewsController));

export default router;