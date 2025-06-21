// @ts-nocheck
import express from 'express';
import { createCheckoutSession } from '../controllers/checkoutController.js';

const router = express.Router();

router.post('/create-session', createCheckoutSession);

export default router;
