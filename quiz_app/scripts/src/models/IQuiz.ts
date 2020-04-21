import IQuestion from './IQuestion';

interface IQuiz {
    id: number;
    name: string;
    description: string;
    questionList: IQuestion[];
}

export default IQuiz;