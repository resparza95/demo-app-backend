import request from 'supertest';
import express from 'express';
import { EntryController } from '../../src/controllers/entry.controller';
import { UsageRepository } from '../../src/repositories/usage.repository';

// Mock the Entry Repository
const entryRepository = {
    saveEntries: jest.fn().mockResolvedValue([{ position: 1, title: 'Entry A', points: 4, commentCount: 20 }, { position: 2, title: 'Entry B', points: 5, commentCount: 35 }]),
    getAllEntries: jest.fn().mockResolvedValue([
        {
            "id": 1,
            "position": 1,
            "title": "Entry A",
            "points": 500,
            "commentCount": 200,
            "createdAt": "2025-05-02T16:10:36.000Z",
            "updatedAt": "2025-05-02T16:10:36.000Z"
        },
        {
            "id": 2,
            "position": 2,
            "title": "Entry B",
            "points": 145,
            "commentCount": 24,
            "createdAt": "2025-05-02T16:10:36.000Z",
            "updatedAt": "2025-05-02T16:10:36.000Z"
        }
    ]),
    clearAllEntries: jest.fn().mockResolvedValue([]),
    findEntriesWithTitleWordCount: jest.fn().mockResolvedValue([
        {
            "id": 29,
            "position": 26,
            "title": "Ask HN: Who is hiring? (May 2025)",
            "points": 227,
            "commentCount": 255,
            "createdAt": "2025-05-02T17:29:05.000Z",
            "updatedAt": "2025-05-02T17:29:05.000Z"
        },
        {
            "id": 30,
            "position": 27,
            "title": "Third party cookies must be removed",
            "points": 406,
            "commentCount": 198,
            "createdAt": "2025-05-02T17:29:05.000Z",
            "updatedAt": "2025-05-02T17:29:05.000Z"
        }
    ])
};

// Create a new Express app and mount the controller
const app = express();
app.use(express.json());
const targetUrl = 'https://news.ycombinator.com';
const usageRepository = new UsageRepository();
const entriesController = new EntryController(entryRepository, targetUrl, usageRepository); 
app.get('/api/entries/crawl', entriesController.crawlAndStore.bind(entriesController));
app.get('/api/entries/list', entriesController.getEntries.bind(entriesController));
app.post('/api/entries/listFiltered', entriesController.getFilteredEntriesByWords.bind(entriesController));
app.delete('/api/entries/delete', entriesController.removeEntries.bind(entriesController));

describe('EntryController', () => {
  it('should crawl entries', async () => {
    const response = await request(app)
      .get('/api/entries/crawl')
      .expect(200);

    expect(response.body).toEqual({ message: 'Entries stored successfully.', itemCount: 30 });
  });

  it('should list all entries', async () => {
    const response = await request(app)
      .get('/api/entries/list')
      .expect(200);

    expect(response.body).toEqual([
        {
            "id": 1,
            "position": 1,
            "title": "Entry A",
            "points": 500,
            "commentCount": 200,
            "createdAt": "2025-05-02T16:10:36.000Z",
            "updatedAt": "2025-05-02T16:10:36.000Z"
        },
        {
            "id": 2,
            "position": 2,
            "title": "Entry B",
            "points": 145,
            "commentCount": 24,
            "createdAt": "2025-05-02T16:10:36.000Z",
            "updatedAt": "2025-05-02T16:10:36.000Z"
        }
    ]);
  });

  it('should list filtered entries', async () => {
    const response = await request(app)
      .post('/api/entries/listFiltered')
      .send({ comparator: ">", orderField: "commentCount"})
      .expect(200);

    expect(response.body).toEqual([
        {
            "id": 29,
            "position": 26,
            "title": "Ask HN: Who is hiring? (May 2025)",
            "points": 227,
            "commentCount": 255,
            "createdAt": "2025-05-02T17:29:05.000Z",
            "updatedAt": "2025-05-02T17:29:05.000Z"
        },
        {
            "id": 30,
            "position": 27,
            "title": "Third party cookies must be removed",
            "points": 406,
            "commentCount": 198,
            "createdAt": "2025-05-02T17:29:05.000Z",
            "updatedAt": "2025-05-02T17:29:05.000Z"
        }
    ]);
  });

  it('should clear all entries from database', async () => {
    const response = await request(app)
      .delete('/api/entries/delete')
      .expect(200);

    expect(response.body).toEqual({ message: 'Entries deleted successfully.'});
  });
});