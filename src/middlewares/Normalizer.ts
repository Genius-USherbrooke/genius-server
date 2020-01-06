import express from 'express';

export const normalizeUsername = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    let username: string = req.body.username;
    if (username) {
        req.body.username = username.toLowerCase().trim();
    }
    next();
};
