import User from '../models/User.js';

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

