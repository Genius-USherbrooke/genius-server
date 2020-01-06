type Evaluation = {
    id: number;
    app: string;
    name: string;
    score: number;
    total: number;
    grades: {
        courseId: string;
        competencyNo: number;
        score: number;
        total: number;
    }[];
}

export default Evaluation;
