import IQuiz from '../models/IQuiz';
import IQuestion from '../models/IQuestion';

const question: {[id: number]: IQuestion} = {

}

const question1: IQuestion = {
    id: 1,
    content: "Ile to 2+3?",
    correctAnswer: 5,
    penalty: 7,
};

const question2: IQuestion= {
    id: 2,
    content: "Ile to 2123+3?",
    correctAnswer: 2126,
    penalty: 7,
};


const question3: IQuestion=  {
    id: 3,
    content: "Ile to 21+37?",
    correctAnswer: 58,
    penalty: 7,
};

const question4: IQuestion=  {
    id: 4,
    content: "Ile to 80+3?",
    correctAnswer: 83,
    penalty: 7,
};


const quiz1: IQuiz = {
    id: 1,
    name: "Działania arytmetyczne",
    description: "To jest quiz z podstawowych działań arytmetycznych",
    questionList: [
        question1,
        question2,
        question3,
        question4,
    ]
}

const quizList: IQuiz[] = [ 
    quiz1,
]

export {
    quizList
}