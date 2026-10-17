import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';

const PASSWORD_RULE = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Prevent deleting the last superadmin if we want to be safe
    if (user.role === 'superadmin' && user.email === process.env.SUPER_ADMIN_EMAIL) {
        return res.status(403).json({ message: 'Cannot delete the main Super Admin' });
    }
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['student', 'admin', 'superadmin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent changing role of the main super admin
    if (user.email === process.env.SUPER_ADMIN_EMAIL && role !== 'superadmin') {
      return res.status(403).json({ message: 'Cannot change main Super Admin role' });
    }

    user.role = role;
    await user.save();
    res.json({ message: 'User role updated', user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Superadmin sets another account's password directly (no current password).
 * The main Super Admin account is excluded so it can only be changed via .env.
 */
export const setUserPassword = async (req, res) => {
  try {
    const { password, notify } = req.body;

    if (!PASSWORD_RULE.test(password || '')) {
      return res.status(400).json({
        message:
          'Password must be at least 8 characters and include letters, numbers, and special characters.',
      });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.email.toLowerCase() === (process.env.SUPER_ADMIN_EMAIL || '').toLowerCase()) {
      return res.status(403).json({ message: 'Cannot change the main Super Admin password' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    let emailSent = false;
    if (notify) {
      try {
        await sendEmail({
          email: user.email,
          subject: 'Your admin password has been changed',
          message: `
            <p>Hi ${user.name},</p>
            <p>A Super Admin has changed the password for your Global Education admin account (${user.email}).</p>
            <p>The new password is not included in this email &mdash; ask the Super Admin who made the change for it.</p>
            <p>If you did not expect this, contact the Super Admin immediately.</p>
          `,
        });
        emailSent = true;
      } catch (mailError) {
        // The password change already succeeded; a failed notice must not undo it.
        console.error('Password change email failed:', mailError.message);
      }
    }

    res.json({ message: 'Password updated', emailSent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Issues a short-lived token for the target admin so a superadmin can open
 * that admin's dashboard. `impersonatedBy` marks the session as borrowed.
 */
export const impersonateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'superadmin') {
      return res.status(403).json({ message: 'Cannot open another Super Admin dashboard' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email,
        impersonatedBy: req.user.email,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
      expiresIn: '2h',
    });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        impersonatedBy: req.user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

