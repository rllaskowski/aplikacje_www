import IAnswer from './IAnswer';

type IResult = {
    quizID: number,
    score: number,
    answers: {[questionID: number]: IAnswer}
};

export default IResult;