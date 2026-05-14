import express from 'express';
import {
	getEvents,
	getEventById,
	createEvent,
	updateEvent,
	deleteEvent
} from '../controllers/eventController.js';
import { auth, adminOnly, optionalAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', optionalAuth, getEvents);
router.get('/:id', optionalAuth, getEventById);
router.post('/', auth, adminOnly, createEvent);
router.put('/:id', auth, adminOnly, updateEvent);
router.delete('/:id', auth, adminOnly, deleteEvent);

export default router;
