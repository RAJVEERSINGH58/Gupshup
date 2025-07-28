import express from 'express';
import { getOtherUser, getProfile, login , logout, register } from '../controllers/userController.js';
import { isAuthenticated  } from '../middlewares/auth-middlewares.js';

const router = express.Router();

router.post('/register' , register);
router.post('/login' , login);
router.get('/get-profile' , isAuthenticated  , getProfile);
router.post('/logout' , isAuthenticated  , logout);
router.get('/get-other-users' , isAuthenticated  , getOtherUser);

export default router;