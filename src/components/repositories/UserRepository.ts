import User from '../../models/User';

const userRepositoryInMemory = new Set<User>();

export namespace UserRepository {
    
    export function addUser(user: User): void {
        userRepositoryInMemory.add(user);
    }
    
    export function getUser(username: string): User | undefined {
        return Array.from(userRepositoryInMemory).find(user => user.username === username);
    }
    
    export function getUsers(): User[] {
        return Array.from(userRepositoryInMemory);
    }
    
    export function removeUser(username: string): void {
        const user = getUser(username);
        if (user) {
            userRepositoryInMemory.delete(user);
        }
    }
}
