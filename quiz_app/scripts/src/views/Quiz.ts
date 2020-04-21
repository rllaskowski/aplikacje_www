import IQuiz from '../models/IQuiz';
import IResult from '../models/IResult';
import IQuestion from '../models/IQuestion';
import { showView, hideView } from '../utils';
import { showMain } from './Main';
import { showResult } from './Result';

// Quiz view components
let quizView = document.getElementById("quiz-view");

let nextBtn = document.getElementById("next-btn");
let prevBtn = document.getElementById("prev-btn");
let cancelBtn = document.getElementById("cancel-btn");
let stopBtn = document.getElementById("stop-btn") as HTMLButtonElement;

let timer = document.getElementById("timer");

let quizDescription = document.getElementById("quiz-description");

let qContent = document.getElementById("q-content");
let ansInput = document.getElementById("ans-input") as HTMLInputElement;

let timerHandler: number;

// Quiz view state
let quiz: IQuiz;
let result: IResult;
let questionIdx: number;
let timeElapsed: number;
let answered: {[id: number]: boolean};
let question: IQuestion;
let answeredCount: number;


// View renderers
const renderTimer = () => {
    timer.innerText = `Czas trwania quizu: ${timeElapsed}s`;
}
    
const renderQuestion = () => {
    answered[question.id] = answered[question.id] ?? false;
    result.answers[question.id] = result.answers[question.id] ?? {
        time: 0,
        content: 0
    };

    ansInput.value = answered[question.id] ? 
        result.answers[question.id].content.toString() : "";

    qContent.innerHTML = question.content;
}

const renderDescription = () => {
    quizDescription.textContent = quiz.description;
}

// View events
nextBtn.onclick = () => {
    if (questionIdx+1 < quiz.questionList.length) {
        questionIdx += 1;
        question = quiz.questionList[questionIdx];

        renderQuestion();
    }
}

prevBtn.onclick = () => {
    if (questionIdx > 0) {
        questionIdx -= 1
        question = quiz.questionList[questionIdx];

        renderQuestion();
    }
}

stopBtn.onclick = () => {
    if (answeredCount === quiz.questionList.length) {
        // Check in case someone was messing with button disabled attr
        

        clearInterval(timerHandler);
        hideView(quizView).then(() => showResult(result, quiz));
    }   
}

cancelBtn.onclick = () => {
    clearInterval(timerHandler);
    hideView(quizView).then(() => showMain());
}


ansInput.oninput = () => {
    if (ansInput.value === "") {
        if (answered[question.id] === true) {
            answeredCount -= 1;
        }
        answered[question.id] = false;
    } else {
        if (answered[question.id] === false) {
            answeredCount += 1;
        }
        answered[question.id] = true;

        result.answers[question.id].content = parseInt(ansInput.value);
    }

    if (answeredCount === quiz.questionList.length) {
        stopBtn.disabled = false;
    } else {
        stopBtn.disabled = true;
    }
}


const showQuiz = (_quiz: IQuiz) => {
    quiz = _quiz;

    questionIdx = 0;
    timeElapsed = 0;
    answered = {};
    question = quiz.questionList[0];
    answeredCount = 0;

    stopBtn.disabled = true;

    result = {
        score: 0,
        answers: {},
        quizID: quiz.id
    }

    renderDescription();
    renderTimer();

    timerHandler = setInterval(() => {
        renderTimer();

        timeElapsed += 1;
        result.answers[question.id].time += 1;
    }, 1000);

    renderQuestion();

    return showView(quizView);
}

export {
    showQuiz
}