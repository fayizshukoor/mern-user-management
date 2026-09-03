import express from 'express';
import { getProfile, removeProfileImage, updateProfile, uploadProfileImage } from '../controllers/user.controller.js';
import authenticate from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.middleware.js';


const router = express.Router();
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.put('/profile/image', authenticate, upload.single("image"), uploadProfileImage);
router.delete('/profile/image', authenticate, removeProfileImage);

export default router;