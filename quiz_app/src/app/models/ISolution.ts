import IAnswer from './IAnswer';

interface ISolution {
    quizId: number;
    answers?: {[questionId: number]: IAnswer};
};

export default ISolution;