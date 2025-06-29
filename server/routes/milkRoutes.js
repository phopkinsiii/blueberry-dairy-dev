// server/routes/milkRoutes.js
import express from 'express';
import {
	getAllMilkRecords,
	getMilkRecordsByGoat,
	getMilkSummary,
	getGoatMilkSummary,
	createMilkRecord,
	updateMilkRecord,
	deleteMilkRecord,
} from '../controllers/milkController.js';

import { protect, adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Public routes
router.get('/', getAllMilkRecords);
router.get('/summary', getMilkSummary);
router.get('/goat/:goatId', getMilkRecordsByGoat);
router.get('/goat/:goatId/summary', getGoatMilkSummary);

// ✅ Admin-only routes
router.post('/', protect, adminProtect, createMilkRecord);
router.put('/:id', protect, adminProtect, updateMilkRecord);
router.delete('/:id', protect, adminProtect, deleteMilkRecord);

export default router;
