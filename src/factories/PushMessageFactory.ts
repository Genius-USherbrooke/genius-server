import Evaluation from '../types/Evaluation';
import PushMessage from '../types/PushMessage';

export namespace PushMessageFactory {
    
    export function createNewEvaluationPushMessage(notificationToken: string, evaluation: Evaluation): PushMessage {
        let body = `App: ${evaluation.app} \n` +
            `Course: ${evaluation.name} \n` +
            `Grade: ${floorAfterTwoDigit(evaluation.score)}/${evaluation.total}  ->  ${floorAfterTwoDigit(((evaluation.score / evaluation.total) * 100))}%`;
        for (const grade of evaluation.grades) {
            body +=
                `\n - ${grade.courseId}-${grade.competencyNo}: ${floorAfterTwoDigit(grade.score)}/${grade.total}  ->  ${floorAfterTwoDigit(((grade.score / grade.total) * 100))}%`;
        }
        return {
            to: notificationToken,
            data: evaluation,
            title: 'You received a new grade',
            body
        };
    }
}

function floorAfterTwoDigit(number: number): number {
    return Math.floor(number * 100) / 100;
}
