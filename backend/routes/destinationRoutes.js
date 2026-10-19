import express from 'express';
import {
	getDestinations,
	getDestinationById,
	createDestination,
	updateDestination,
	updateDestinationGuide,
	deleteDestination
} from '../controllers/destinationController.js';
import { auth, adminOnly, optionalAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', optionalAuth, getDestinations);
router.get('/:id', optionalAuth, getDestinationById);

router.post('/', auth, adminOnly, createDestination);
router.put('/:id', auth, adminOnly, updateDestination);
router.patch('/:id/guide', auth, adminOnly, updateDestinationGuide);
router.delete('/:id', auth, adminOnly, deleteDestination);

export default router;
