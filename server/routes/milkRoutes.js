// server/routes/milkRoute.js
import express from 'express';
import {
	getAllMilkRecords,
	getMilkRecordsByGoat,
	getMilkSummary,
	createMilkRecord,
	updateMilkRecord,
	deleteMilkRecord,
    getGoatMilkSummary,
} from '../controllers/milkController.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllMilkRecords);
router.get('/summary', getMilkSummary); // summary totals
router.get('/goat/:goatId', getMilkRecordsByGoat); // per-goat view
router.get('/goat/:goatId/summary', getGoatMilkSummary);


//Admin only routes
router.post('/', protect, adminProtect, createMilkRecord);
router.put('/:id', protect, adminProtect, updateMilkRecord);
router.delete('/:id', protect, adminProtect, deleteMilkRecord);

export default router;
