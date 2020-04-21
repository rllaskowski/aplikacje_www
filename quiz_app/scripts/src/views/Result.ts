import { showView, hideView } from '../utils';
import IResult from '../models/IResult';
import IAnswer from '../models/IAnswer';
import IQuiz from '../models/IQuiz';
import IQuestion from '../models/IQuestion';
import { showMain } from './Main';
import { saveResult } from '../utils';


// Summary view components
let resultView = document.getElementById("result-view");

let answerList = document.getElementById("answer-list");

let scoreP = document.getElementById("score");


let saveStatsBtn = document.getElementById("save-stats-btn");
let saveScoreBtn = document.getElementById("save-score-btn");

// Result view state
let result: IResult;
let questionDict: {[id: number]: IQuestion}


// View renderers

const renderAnswers = () => {
    answerList.innerHTML = "";

    Object.keys(result.answers).forEach((questionId) => {
        let answerLi = document.createElement("li") as HTMLElement;
        const id = parseInt(questionId);

        answerLi.innerText = result.answers[id].content.toString();

        if (result.answers[id].content === questionDict[id].correctAnswer) {
            answerLi.classList.add("correct");
        }

        answerList.appendChild(answerLi);
    });
}

const renderScore = () => {
    scoreP.innerHTML = `Twój wynik: ${result.score}`;
}


// View events
saveStatsBtn.onclick = () => {
    saveResult(result);

    hideView(resultView).then(() => showMain());
}

saveScoreBtn.onclick = () => {
    delete result.answers;

    saveResult(result);

    hideView(resultView).then(() => showMain());
}


// Show view func
const showResult = (_result: IResult, quiz: IQuiz) => {
    result = _result;
    questionDict = {};
    

    quiz.questionList.forEach(question => {
        questionDict[question.id] = question;
        result.score += result.answers[question.id].time;
        
        if (result.answers[question.id].content !== question.correctAnswer) {
            result.score += question.penalty;
        }
    });

    renderScore();
    renderAnswers();

    return showView(resultView);
}



export {
    showResult
}