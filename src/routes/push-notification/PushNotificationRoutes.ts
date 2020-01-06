import express from 'express';
import { registerForPushNotificationHandler } from '../../controllers/PushNotificationController';
import { normalizeUsername } from '../../middlewares/Normalizer';

const router = express.Router();

router.post('/token', [normalizeUsername], registerForPushNotificationHandler);

export default router;
