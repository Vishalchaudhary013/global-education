import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, region, role: requestedRole } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let role = "admin";
    if (email.toLowerCase() === (process.env.SUPER_ADMIN_EMAIL || "").toLowerCase()) {
      role = "superadmin";
    }

    user = new User({ name, email, password: hashedPassword, role, phone: phone || "", region: region || "" });
    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            region: user.region,
          },
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    const isSuperAdmin = email.toLowerCase() === (process.env.SUPER_ADMIN_EMAIL || "").toLowerCase();
    const isSuperAdminPassword = password === process.env.SUPER_ADMIN_PASSWORD;

    // Handle Super Admin from .env master password
    if (isSuperAdmin && isSuperAdminPassword) {
      if (!user) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = new User({
          name: "Super Admin",
          email: email.toLowerCase(),
          password: hashedPassword,
          role: "superadmin",
        });
        await user.save();
      } else {
        // Ensure role is superadmin and password is correct in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch || user.role !== "superadmin") {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);
          user.role = "superadmin";
          await user.save();
        }
      }
    } else {
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
    }

    const adminEmails = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((adminEmail) => adminEmail.trim().toLowerCase())
      .filter(Boolean);

    let effectiveRole = user.role;
    if (user.email.toLowerCase() === (process.env.SUPER_ADMIN_EMAIL || "").toLowerCase()) {
      effectiveRole = "superadmin";
    } else if (adminEmails.includes(user.email.toLowerCase())) {
      effectiveRole = "admin";
    }
    
    if (effectiveRole === "student") {
      return res.status(403).json({ message: "Student login is disabled on this platform." });
    }

    if (effectiveRole !== user.role) {
      user.role = effectiveRole;
      await user.save();
    }

    const payload = {
      user: {
        id: user.id,
        role: effectiveRole,
        name: user.name,
        email: user.email,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: effectiveRole,
            region: user.region,
          },
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
