type Course = {
    id: string;
    score: number;
    total: number;
    competencies: {
        no: number;
        score: number;
        total: number;
    }[];
}

export default Course;
