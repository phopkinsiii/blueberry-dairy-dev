import express from 'express';
import { createContact, getAllContacts, getSingleContact, deleteContact } from '../controllers/contactController.js';
import {adminProtect, protect} from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/', createContact);

//Protected routes. Must be administrator and logged in user.
router.get('/', protect, adminProtect, getAllContacts);
router.get('/:id', protect, adminProtect, getSingleContact),
router.delete('/:id', protect, adminProtect, deleteContact)

export default router;