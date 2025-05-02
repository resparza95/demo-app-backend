import request from 'supertest';
import express from 'express';
import { UsageController } from '../../src/controllers/usage.controller';

// Mock the Usage Repository
const usageRepository = {
    saveItem: jest.fn().mockResolvedValue({ appliedFilter: '> than 5 words', appliedOrder: 'Ordered by commentCount column DESC' }),
    getAllItems: jest.fn().mockResolvedValue([
        {
            "id": 1,
            "appliedFilter": "> than 5 words",
            "appliedOrder": "Ordered by commentCount column DESC",
            "createdAt": "2025-05-02T15:42:04.000Z",
            "updatedAt": "2025-05-02T15:42:04.000Z"
        },
        {
            "id": 2,
            "appliedFilter": "> than 5 words",
            "appliedOrder": "duplicate@example.com",
            "createdAt": "2025-05-02T15:42:04.000Z",
            "updatedAt": "2025-05-02T15:42:04.000Z"
        },
        {
            "id": 3,
            "appliedFilter": "> than 5 words",
            "appliedOrder": "duplicate@example.com",
            "createdAt": "2025-05-02T15:42:04.000Z",
            "updatedAt": "2025-05-02T15:42:04.000Z"
        }
    ]),
};

// Create a new Express app and mount the controller
const app = express();
app.use(express.json());
const usageController = new UsageController(usageRepository); // Inject the mock service
app.get('/api/usage/list', usageController.getEntries.bind(usageController));

describe('UsageController', () => {
  it('should list all log entries', async () => {
    const response = await request(app)
      .get('/api/usage/list')
      .expect(200);

    expect(response.body).toEqual([
        {
            "id": 1,
            "appliedFilter": "> than 5 words",
            "appliedOrder": "Ordered by commentCount column DESC",
            "createdAt": "2025-05-02T15:42:04.000Z",
            "updatedAt": "2025-05-02T15:42:04.000Z"
        },
        {
            "id": 2,
            "appliedFilter": "> than 5 words",
            "appliedOrder": "duplicate@example.com",
            "createdAt": "2025-05-02T15:42:04.000Z",
            "updatedAt": "2025-05-02T15:42:04.000Z"
        },
        {
            "id": 3,
            "appliedFilter": "> than 5 words",
            "appliedOrder": "duplicate@example.com",
            "createdAt": "2025-05-02T15:42:04.000Z",
            "updatedAt": "2025-05-02T15:42:04.000Z"
        }
    ]);
  });

});