import express from 'express';
import { UsageRepository } from '../repositories/usagerepository';
import { UsageController } from '../controllers/usage.controller';

const router = express.Router();
const usageRepository = new UsageRepository();
const usageController = new UsageController(usageRepository);

router.get('/list', usageController.getEntries.bind(usageController));

export default router;