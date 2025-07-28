import express from 'express';
import { isAuthenticated } from '../middlewares/auth-middlewares.js';
import { sendMessage , getMessage } from '../controllers/messageController.js';

const router = express.Router();

router.post('/send/:receiverId' , isAuthenticated , sendMessage);
router.get('/get-messages/:otherParticipantId' , isAuthenticated , getMessage);

export default router;