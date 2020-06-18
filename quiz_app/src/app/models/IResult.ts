interface IResult {
    quizId: number;
    score: number;
    answers: {[questionId: number]: number};
};

export default IResult;