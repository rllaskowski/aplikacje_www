import IQuiz from '../models/IQuiz';
import IQuestion from '../models/IQuestion';

const question: {[id: number]: IQuestion} = {

}

const question1: IQuestion = {
    id: 1,
    content: "Ile to 2+3?",
    correctAnswer: 5,
    penalty: 3,
};

const question2: IQuestion= {
    id: 2,
    content: "Ile to 2123+3?",
    correctAnswer: 2126,
    penalty: 12,
};


const question3: IQuestion=  {
    id: 3,
    content: "Ile to 21+37?",
    correctAnswer: 58,
    penalty: 17,
};

const question4: IQuestion=  {
    id: 4,
    content: "Ile to 80+3?",
    correctAnswer: 83,
    penalty: 10,
};


const quiz1: IQuiz = {
    id: 1,
    name: "Działania arytmetyczne",
    description: "To jest quiz z podstawowych działań arytmetycznych",
    questionList: [
        question1,
        question4,
    ]
}


const quiz2: IQuiz = {
    id: 1,
    name: "Mnożenie",
    description: "Pamiętaj, że wynik mnożenia to iloczyn!",
    questionList: [
        question1,
        question2,
        question4,
    ]
}

const quiz3: IQuiz = {
    id: 1,
    name: "Dodawanie",
    description: "Pamiętaj, że wynik mnożenia to iloczyn!",
    questionList: [
        question1,
        question2,
        question3,
        question4,
    ]
}


const quiz4: IQuiz = {
    id: 1,
    name: "Dzielenie",
    description: "Pamiętaj, że wynik mnożenia to iloczyn!",
    questionList: [
        question2,
        question3,
        question4,
    ]
}




const quizList: IQuiz[] = [ 
    quiz1, quiz2, quiz3, quiz4
]

export {
    quizList
}