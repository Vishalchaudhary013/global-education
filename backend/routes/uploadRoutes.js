import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import express from 'express';
import multer from 'multer';
import { auth, adminOnly } from '../middlewares/auth.js';

const UPLOAD_DIR = path.resolve('uploads');
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOAD_DIR),
    // A random name keeps uploads from colliding or overwriting each other, and
    // stops a crafted filename from escaping the upload directory.
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase().slice(0, 10);
        cb(null, `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${ext}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (req, file, cb) => {
        if (!ALLOWED_TYPES.includes(file.mimetype)) {
            return cb(new Error('Only JPEG, PNG, WebP, GIF or SVG images can be uploaded'));
        }
        cb(null, true);
    }
});

const router = express.Router();

/**
 * Stores one image and returns its public URL, which the admin forms write into
 * the same field that otherwise holds a pasted link.
 */
router.post('/', auth, adminOnly, (req, res) => {
    upload.single('file')(req, res, (uploadError) => {
        if (uploadError) {
            const message =
                uploadError.code === 'LIMIT_FILE_SIZE'
                    ? 'Image is larger than the 5MB limit'
                    : uploadError.message;
            return res.status(400).json({ message });
        }

        if (!req.file) return res.status(400).json({ message: 'No file was uploaded' });

        const base = process.env.PUBLIC_URL || `${req.protocol}://${req.get('host')}`;
        res.status(201).json({
            url: `${base}/uploads/${req.file.filename}`,
            name: req.file.originalname,
            size: req.file.size
        });
    });
});

export default router;
