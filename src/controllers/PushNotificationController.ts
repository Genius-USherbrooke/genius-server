import { RequestHandler } from 'express';
import { SchedulerManager } from '../components/managers/SchedulerManager';
import { UserRepository } from '../components/repositories/UserRepository';
import Logger from '../logger/Logger';

export const registerForPushNotificationHandler: RequestHandler = async (req, res) => {
    const token = req.body.token.value;
    const username = req.body.user.username;
    if (token && username) {
        const user = UserRepository.getUser(username);
        if (user) {
            Logger.info(`User ${user.username} register for push notification with token ${token}`);
            user.notificationToken = token;
            SchedulerManager.createUpdateGradeScheduler(user).start();
            res.status(202).send();
            
        } else {
            res.status(400).send({ message: `the user:[${username}] does not exist` });
        }
        
    } else {
        res.status(400).send({ message: 'You need to provide a token and a username' });
    }
};
