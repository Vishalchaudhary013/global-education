import express from 'express';
import {
  getUsers,
  deleteUser,
  updateRole,
  setUserPassword,
  impersonateUser,
} from '../controllers/userController.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', protect, authorize('superadmin'), getUsers);
router.delete('/:id', protect, authorize('superadmin'), deleteUser);
router.patch('/:id/role', protect, authorize('superadmin'), updateRole);
router.patch('/:id/password', protect, authorize('superadmin'), setUserPassword);
router.post('/:id/impersonate', protect, authorize('superadmin'), impersonateUser);

export default router;
