import express from 'express';
import {
	getUniversities,
	getUniversityById,
	createUniversity,
	updateUniversity,
	deleteUniversity
} from '../controllers/universityController.js';
import { auth, adminOnly, optionalAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', optionalAuth, getUniversities);
router.get('/:id', optionalAuth, getUniversityById);

router.post('/', auth, adminOnly, createUniversity);
router.put('/:id', auth, adminOnly, updateUniversity);
router.delete('/:id', auth, adminOnly, deleteUniversity);

export default router;
