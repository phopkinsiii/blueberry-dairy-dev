// server/routes/milkRoute.js
import express from 'express';
import {
	getFilteredMilkRecords,
	getMilkRecordsByGoat,
	getMilkSummary,
	createMilkRecord,
	updateMilkRecord,
	deleteMilkRecord,
	getGoatMilkSummary,
	getMilkRecordById,
} from '../controllers/milkController.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getFilteredMilkRecords); // Replaces getAllMilkRecords

router.get('/summary', getMilkSummary);
router.get('/goat/:goatId/summary', getGoatMilkSummary); // more specific route FIRST
router.get('/goat/:goatId', getMilkRecordsByGoat);       // more general route SECOND
router.get('/:id', getMilkRecordById);                   // wildcard route LAST


//Admin only routes
router.post('/', protect, adminProtect, createMilkRecord);
router.put('/:id', protect, adminProtect, updateMilkRecord);
router.delete('/:id', protect, adminProtect, deleteMilkRecord);

export default router;
