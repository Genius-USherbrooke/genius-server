import Course from '../../types/Course';
import Evaluation from '../../types/Evaluation';
import USherbrookeResults from '../../types/USherbrookeResults';

export namespace USherbrookeTranslator {
    
    export function translateUSherbrookeResult(uSherbrookeResultsResults: USherbrookeResults): {courses: Course[]; latestEvaluations: Evaluation[]} {
        const courses = uSherbrookeResultsResults.aps.map<Course>(aps => {
            return {
                id: aps.id,
                score: aps.score,
                total: aps.total,
                competencies: aps.competences.map(competency => {
                    return {
                        no: +competency.id,
                        total: competency.total,
                        score: competency.score
                    };
                    
                })
            };
        });
        
        const evaluations = uSherbrookeResultsResults.evaluations.map<Evaluation>(evaluation => {
            return {
                id: evaluation.id,
                app: evaluation.unit,
                name: evaluation.title,
                score: evaluation.score,
                total: evaluation.total,
                grades: evaluation.competences.map(competency => {
                    return {
                        courseId: competency.id.split('-')[0],
                        competencyNo: +competency.id.split('-')[1],
                        total: competency.total,
                        score: competency.score
                    };
                })
            };
        });
        
        return { courses, latestEvaluations: evaluations };
    }
}
