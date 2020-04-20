import IQuestion from './IQuestion';

interface IQuiz {
    id: number;
    description: string;
    questionList: IQuestion[];
}

export default IQuiz;