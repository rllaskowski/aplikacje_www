import IQuiz from '../app/models/IQuiz';
import IQuestion from '../app/models/IQuestion';

const question1: IQuestion = {
    content: "Ile to 2+3?",
    answer: 5,
    penalty: 3,
};

const question2: IQuestion= {
    content: "Ile to 3333/3?",
    answer: 1111,
    penalty: 12,
};


const question3: IQuestion=  {
    content: "Ile to 38+22?",
    answer: 60,
    penalty: 17,
};

const question4: IQuestion=  {
    content: "Ile to 80+3?",
    answer: 83,
    penalty: 10,
};


const question5: IQuestion=  {
    content: "Ile to 80*3?",
    answer: 240,
    penalty: 12,
};


const question6: IQuestion=  {
    content: "Ile to 16/2?",
    answer: 8,
    penalty: 20,
};


const question7: IQuestion=  {
    content: "Ile to 16/2?",
    answer: 8,
    penalty: 19,
};

const question8: IQuestion=  {
    content: "Ile to 24/3?",
    answer: 8,
    penalty: 17,
};

const question9: IQuestion=  {
    content: "Ile to 3*20?",
    answer: 60,
    penalty: 13,
};

const question10: IQuestion=  {
    content: "Ile to 16*2?",
    answer: 32,
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
};

const quiz2: IQuiz = {
    id: 2,
    name: "Mnożenie",
    description: "Pamiętaj, że wynik mnożenia to iloczyn!",
    questionList: [
        question5,
        question9,
        question10,
    ]
};

const quiz3: IQuiz = {
    id: 3,
    name: "Dodawanie",
    description: "Pamiętaj, że dodawnie jest przemienne!",
    questionList: [
        question1,
        question3,
        question4,
    ]
};


const quiz4: IQuiz = {
    id: 4,
    name: "Dzielenie",
    description: "Pamiętaj, że wynik dzielenia to iloraz!",
    questionList: [
        question2,
        question7,
        question8,
    ]
};

const quizList: IQuiz[] = [ 
    quiz1, quiz2, quiz3, quiz4
];

const userList: {username: string, password: string}[] = [
    {
        username: "user1",
        password: "user1"
    }, 
    {
        username: "user2",
        password: "user2"
    },
    {
        username: "robert",
        password: "123"
    }
];

export {
    quizList,
    userList,
}