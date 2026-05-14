import express from 'express';
import {
	getCourses,
	getCourseById,
	filterCourses,
	createCourse,
	updateCourse,
	deleteCourse
} from '../controllers/courseController.js';
import { auth, adminOnly, optionalAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', optionalAuth, getCourses);
router.get('/filter', optionalAuth, filterCourses);
router.get('/:id', optionalAuth, getCourseById);

router.post('/', auth, adminOnly, createCourse);
router.put('/:id', auth, adminOnly, updateCourse);
router.delete('/:id', auth, adminOnly, deleteCourse);

export default router;
