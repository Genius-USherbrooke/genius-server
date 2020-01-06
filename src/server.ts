import bodyParser from 'body-parser';
import express from 'express';
import * as http from 'http';
import { AddressInfo } from 'net';
import { ClientManager } from './components/managers/ClientManager';
import { UserRepository } from './components/repositories/UserRepository';
import Logger from './logger/Logger';
import User from './models/User';
import router from './routes/Router';

/**todo create a login instead of login in env variable*/
// #####################################################################################################################
const user = new User(
    process.env.GENIUS_USERNAME?.toLowerCase().trim() || '',
    process.env.GENIUS_PASSWORD || '');
ClientManager.createUSherbrookeClient(user);
UserRepository.addUser(user);

// #####################################################################################################################

const app: express.Application = express();

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(bodyParser.json());

app.use('/', router);

const server = http.createServer(app);

server.listen(process.env.GENIUS_PORT || 0, () => {
    const { port } = server.address() as AddressInfo;
    Logger.info(`Server listening on port ${port}`);
});

