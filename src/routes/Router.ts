import express from 'express';
import Logger from '../logger/Logger';
import { hasAccessToken } from '../middlewares/HasAccessToken';
import PushNotificationRoutes from './push-notification/PushNotificationRoutes';

const router = express.Router();

router.use('/push-notification', [hasAccessToken], PushNotificationRoutes);

router.use('/', (req: express.Request, res: express.Response) => {
    res.status(404).send('not found');
});

router.use((error: Error, req: express.Request, res: express.Response) => {
    Logger.error(error.message);
    res.status(500).json({ error: { message: error.message } });
});

export default router;
