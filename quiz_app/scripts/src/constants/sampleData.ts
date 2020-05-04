import IQuiz from '../models/IQuiz';
import IQuestion from '../models/IQuestion';


const question1: IQuestion = {
    id: 1,
    content: "Ile to 2+3?",
    correctAnswer: 5,
    penalty: 3,
};

const question2: IQuestion= {
    id: 2,
    content: "Ile to 3333/3?",
    correctAnswer: 1111,
    penalty: 12,
};


const question3: IQuestion=  {
    id: 3,
    content: "Ile to 38+22?",
    correctAnswer: 60,
    penalty: 17,
};

const question4: IQuestion=  {
    id: 4,
    content: "Ile to 80+3?",
    correctAnswer: 83,
    penalty: 10,
};


const question5: IQuestion=  {
    id: 5,
    content: "Ile to 80*3?",
    correctAnswer: 240,
    penalty: 12,
};



const question6: IQuestion=  {
    id: 6,
    content: "Ile to 16/2?",
    correctAnswer: 8,
    penalty: 20,
};


const question7: IQuestion=  {
    id: 7,
    content: "Ile to 16/2?",
    correctAnswer: 8,
    penalty: 19,
};

const question8: IQuestion=  {
    id: 8,
    content: "Ile to 24/3?",
    correctAnswer: 8,
    penalty: 17,
};

const question9: IQuestion=  {
    id: 9,
    content: "Ile to 3*20?",
    correctAnswer: 60,
    penalty: 13,
};

const question10: IQuestion=  {
    id: 10,
    content: "Ile to 16*2?",
    correctAnswer: 32,
    penalty: 15,
};

const quiz1: IQuiz = {
    id: 1,
    name: "Działania arytmetyczne",
    description: "To jest quiz z podstawowych działań arytmetycznych",
    questionList: [
        question1,
        question4,
        question8,
        question10,
    ]
}


const quiz2: IQuiz = {
    id: 1,
    name: "Mnożenie",
    description: "Pamiętaj, że wynik mnożenia to iloczyn!",
    questionList: [
        question5,
        question9,
        question10,
    ]
}

const quiz3: IQuiz = {
    id: 1,
    name: "Dodawanie",
    description: "Pamiętaj, że dodawnie jest przemienne!",
    questionList: [
        question1,
        question3,
        question4,
    ]
}


const quiz4: IQuiz = {
    id: 1,
    name: "Dzielenie",
    description: "Pamiętaj, że wynik dzielenia to iloraz!",
    questionList: [
        question2,
        question7,
        question8,
    ]
}




const quizList: IQuiz[] = [ 
    quiz1, quiz2, quiz3, quiz4
]

export {
    quizList
}