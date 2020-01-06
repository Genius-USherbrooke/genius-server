import * as cheerio from 'cheerio';
import qs from 'querystring';
import request from 'request';
import User from '../../models/User';
import USherbrookeResults from '../../types/USherbrookeResults';

const USER_AGENT = 'nodejs/express';
const CAS_US_URL = 'https://cas.usherbrooke.ca';
const GEL_US_URL = 'https://www.gel.usherbrooke.ca';

// todo better error logging
export default class USherbrookeClient {
    
    private readonly cookieJar: request.CookieJar;
    private readonly casUSherbrookeRequest: request.RequestAPI<request.Request, request.CoreOptions, request.RequiredUriUrl>;
    private readonly gelUSherbrookeRequest: request.RequestAPI<request.Request, request.CoreOptions, request.RequiredUriUrl>;
    
    private readonly user: User;
    
    public constructor(user: User) {
        this.cookieJar = request.jar();
        const baseRequest = request.defaults({ jar: this.cookieJar, headers: { 'User-Agent': USER_AGENT } });
        this.casUSherbrookeRequest = baseRequest.defaults({ baseUrl: CAS_US_URL });
        this.gelUSherbrookeRequest = baseRequest.defaults({ baseUrl: GEL_US_URL });
        
        this.user = user;
    }
    
    async login(): Promise<boolean> {
        let $ = cheerio.load(await this.requestLoginHtml());
        const lt = $('[name=lt]').val();
        const execution = $('[name=execution]').val();
        
        const html: string = await new Promise((resolve, reject) => {
            this.casUSherbrookeRequest.post({
                                                url: 'login',
                                                headers: {
                                                    'content-type': 'application/x-www-form-urlencoded'
                                                },
                                                body: qs.stringify({
                                                                       username: this.user.username,
                                                                       password: this.user.password,
                                                                       lt,
                                                                       execution,
                                                                       '_eventId': 'submit'
                                                                   })
                                            },
                                            (error, response, body) => {
                                                if (error) reject(error);
                                                else resolve(body || '');
                                            });
        });
        $ = cheerio.load(html);
        return $('.success-info').length !== 0;
    }
    
    async logout(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.casUSherbrookeRequest.get('logout', (error) => {
                if (error) reject(error);
                else resolve();
            });
        });
    }
    
    async isConnected(): Promise<boolean> {
        const $ = cheerio.load(await this.requestLoginHtml());
        return $('.success-info').length !== 0;
    }
    
    async getGrades(): Promise<USherbrookeResults> {
        return new Promise((resolve, reject) => {
            // todo make trimester variable
            this.gelUSherbrookeRequest.get('/grille-notes/api/grid/results?trimester=A19',
                                           (error, response, body) => {
                                               if (error) reject(error);
                                               else resolve(JSON.parse(body));
                                           });
        });
    }
    
    private async requestLoginHtml(): Promise<string> {
        return await new Promise((resolve, reject) => {
            this.casUSherbrookeRequest.get({ url: 'login' },
                                           (error, response, body) => {
                                               if (error) reject(error);
                                               else resolve(body || '');
                                           });
        });
    }
}
