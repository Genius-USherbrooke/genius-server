import User from '../../models/User';
import UpdateUserEvaluationScheduler from '../../schedulers/UpdateUserEvaluationScheduler';

export interface UserSchedulers {
    updateEvaluation?: UpdateUserEvaluationScheduler;
}

const userSchedulersByUsername = new Map<string, UserSchedulers>();

export namespace SchedulerManager {
    
    export function createUpdateGradeScheduler(user: User): UpdateUserEvaluationScheduler {
        const scheduler = new UpdateUserEvaluationScheduler(user);
        if (!userSchedulersByUsername.has(user.username)) {
            userSchedulersByUsername.set(user.username, {});
        }
        (userSchedulersByUsername.get(user.username) as UserSchedulers).updateEvaluation = scheduler;
        return scheduler;
    }
}
