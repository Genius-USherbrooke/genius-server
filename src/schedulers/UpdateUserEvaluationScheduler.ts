import equals from 'fast-deep-equal';
import { ClientManager } from '../components/managers/ClientManager';
import { NotificationService } from '../components/services/NotificationService';
import { USherbrookeTranslator } from '../components/translators/USherbrookeTranslator';
import { PushMessageFactory } from '../factories/PushMessageFactory';
import Logger from '../logger/Logger';
import User from '../models/User';
import Evaluation from '../types/Evaluation';
import { getDiffBetweenObjects } from '../util/Util';
import getUSherbrookeClient = ClientManager.getUSherbrookeClient;
import sendNotification = NotificationService.sendNotification;
import createNewEvaluationPushMessage = PushMessageFactory.createNewEvaluationPushMessage;
import translateUSherbrookeResult = USherbrookeTranslator.translateUSherbrookeResult;

const INTERVAL_TIMEOUT: number = +(process.env.GENIUS_INTERVAL_TIMEOUT || 300000);

export default class UpdateUserEvaluationScheduler {
    
    private readonly user: User;
    private intervalId?: NodeJS.Timeout;
    
    constructor(user: User) {
        this.user = user;
    }
    
    start() {
        this.intervalId = setInterval(() => this.updateUserGrades(), INTERVAL_TIMEOUT);
    }
    
    stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
    
    private async updateUserGrades(): Promise<void> {
        const uSherbrookeClient = getUSherbrookeClient(this.user);
        if (uSherbrookeClient) {
            if (await uSherbrookeClient.isConnected()) {
                const { latestEvaluations } = translateUSherbrookeResult(await uSherbrookeClient.getGrades());
                if (!equals(this.user.evaluations, latestEvaluations)) {
                    if (this.user.evaluations.length > 0) {
                        const newEvaluations = findNewEvaluation(this.user.evaluations, latestEvaluations);
                        newEvaluations.forEach(evaluation => sendNotification(createNewEvaluationPushMessage(this.user.notificationToken, evaluation)));
                    }
                    this.user.evaluations = latestEvaluations;
                    
                } else {
                    Logger.info(`User:[${this.user.username}] grades's not updated because no change`);
                }
            } else {
                Logger.warn(`User:[${this.user.username}] not logged in`);
                await uSherbrookeClient.login();
                this.updateUserGrades();
            }
        }
        
    }
}

function findNewEvaluation(evaluations: Evaluation[], latestEvaluation: Evaluation[]): Evaluation[] {
    const newEvaluations: Evaluation[] = [];
    const evaluationById: any = {};
    evaluations.forEach(evaluation => evaluationById[evaluation.id] = evaluation);
    latestEvaluation.forEach(evaluation => {
        if (evaluationById.hasOwnProperty(evaluation.id)) {
            const { modifiedFields, newFields, newObject } = getDiffBetweenObjects<Evaluation>(evaluationById[evaluation.id], evaluation);
            if (Object.keys(modifiedFields).length > 0 || Object.keys(newFields).length > 0) {
                newEvaluations.push(newObject);
            }
        } else {
            newEvaluations.push(evaluation);
        }
    });
    return newEvaluations;
}
