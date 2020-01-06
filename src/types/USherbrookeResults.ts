type USherbrookeResults = {
    evaluations: {
        id: number;
        unit: string;
        title: string;
        score: number;
        total: number;
        order: number;
        competences: {
            id: string;
            score: number;
            total: number;
        }[];
    }[];
    aps: {
        id: string;
        score: number;
        total: number;
        competences: {
            id: string;
            score: number;
            total: number;
        }[];
    }[];
}

export default USherbrookeResults;
