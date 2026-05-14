import express from 'express';
import {
	getScholarships,
	getScholarshipById,
	createScholarship,
	updateScholarship,
	deleteScholarship
} from '../controllers/scholarshipController.js';
import { auth, adminOnly, optionalAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', optionalAuth, getScholarships);
router.get('/:id', optionalAuth, getScholarshipById);

router.post('/', auth, adminOnly, createScholarship);
router.put('/:id', auth, adminOnly, updateScholarship);
router.delete('/:id', auth, adminOnly, deleteScholarship);

export default router;
