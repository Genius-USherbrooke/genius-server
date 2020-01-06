import crypto from 'crypto';
import Course from '../types/Course';
import Evaluation from '../types/Evaluation';

export default class User {
    
    private readonly algorithm: string;
    private readonly key: Buffer;
    private readonly iv: Buffer;
    
    private _username: string;
    private _password!: {encryptedData: string; iv: string;};
    
    private _notificationToken: string;
    
    private _evaluations: Evaluation[];
    private _courses: Course[]; // never update for now
    
    
    constructor(username: string, password: string) {
        this.algorithm = 'aes-256-cbc';
        this.key = crypto.randomBytes(32);
        this.iv = crypto.randomBytes(16);
        
        this._username = username || '';
        this.password = password || '';
        
        this._notificationToken = '';
        
        this._evaluations = [];
        this._courses = [];
    }
    
    private encryptPassword(password: string): void {
        const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.key), this.iv);
        let encryptedPassword = cipher.update(password);
        encryptedPassword = Buffer.concat([encryptedPassword, cipher.final()]);
        this._password = { iv: this.iv.toString('hex'), encryptedData: encryptedPassword.toString('hex') };
    }
    
    private decryptPassword(): string {
        let iv = Buffer.from(this._password.iv, 'hex');
        let encryptedText = Buffer.from(this._password.encryptedData, 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
    
    get username(): string {
        return this._username;
    }
    
    set username(username: string) {
        this._username = username;
    }
    
    get password(): string {
        return this.decryptPassword();
    }
    
    set password(password: string) {
        this.encryptPassword(password);
    }
    
    get notificationToken(): string {
        return this._notificationToken;
    }
    
    set notificationToken(value: string) {
        this._notificationToken = value;
    }
    
    get evaluations(): Evaluation[] {
        return this._evaluations;
    }
    
    set evaluations(value: Evaluation[]) {
        this._evaluations = value;
    }
    
    get courses(): Course[] {
        return this._courses;
    }
    
    set courses(value: Course[]) {
        this._courses = value;
    }
}
