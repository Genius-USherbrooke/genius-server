import User from '../../models/User';
import USherbrookeClient from '../clients/USherbrookeClient';

export interface UserClients {
    uSherbrooke?: USherbrookeClient;
}

const userClientsByUsername = new Map<string, UserClients>();

export namespace ClientManager {
    
    export function createUSherbrookeClient(user: User): USherbrookeClient {
        const client = new USherbrookeClient(user);
        if (!userClientsByUsername.has(user.username)) {
            userClientsByUsername.set(user.username, {});
        }
        (userClientsByUsername.get(user.username) as UserClients).uSherbrooke = client;
        return client;
    }
    
    export function getUSherbrookeClient(user: User): USherbrookeClient | undefined {
        const userClients = userClientsByUsername.get(user.username);
        if (userClients) {
            return userClients.uSherbrooke;
        }
        return undefined;
    }
}
