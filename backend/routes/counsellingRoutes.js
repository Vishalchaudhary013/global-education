import express from 'express';
import {
	submitCounsellingRequest,
	getCounsellingRequests,
	updateCounsellingRequestStatus
} from '../controllers/counsellingController.js';
import { auth, adminOnly } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', submitCounsellingRequest);
router.get('/', auth, adminOnly, getCounsellingRequests);
router.patch('/:id/status', auth, adminOnly, updateCounsellingRequestStatus);

export default router;
