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
	getAllTimeSummary,
	getYearlySummary,
} from '../controllers/milkController.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getFilteredMilkRecords); // Replaces getAllMilkRecords

router.get('/summary', protect, getMilkSummary);
router.get('/summary/all-time', protect, getAllTimeSummary);
router.get('/summary/by-year', protect, getYearlySummary);
router.get('/goat/:goatId/summary', protect, getGoatMilkSummary); // more specific route FIRST
router.get('/goat/:goatId', protect, getMilkRecordsByGoat);       // more general route SECOND
router.get('/:id', protect, getMilkRecordById);                   // wildcard route LAST


//Admin only routes
router.post('/', protect, adminProtect, createMilkRecord);
router.put('/:id', protect, adminProtect, updateMilkRecord);
router.delete('/:id', protect, adminProtect, deleteMilkRecord);

export default router;
