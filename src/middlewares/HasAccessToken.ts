import express from 'express';
import Logger from '../logger/Logger';

export const hasAccessToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (process.env.GENIUS_ACCESS_TOKEN) {
        const { accessToken } = req.body;
        if (process.env.GENIUS_ACCESS_TOKEN === accessToken) {
            next();
        } else {
            Logger.warn(`Someone try to access without the good access token`);
            res.status(401).send();
        }
    } else {
        Logger.warn(`You need to set the environment variable 'GENIUS_ACCESS_TOKEN' because it is may cause security issues`);
        next();
    }
};
