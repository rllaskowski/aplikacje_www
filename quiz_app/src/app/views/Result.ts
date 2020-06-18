import { showView } from "./view";
import IResult from '../models/IResult';
import { getResult, getQuizAll, getBestScores } from "../api";
import IQuestion from '../models/IQuestion';
import { mainView } from './Main';

const resultView = async (quizId: number, _result: IResult = null) : Promise<HTMLElement> => {
    // Result view components
    const view = document.getElementById("result-view");
    const answerList = document.getElementById("answer-list");
    const scoreP = document.getElementById("score");
    const homeBtn = document.getElementById("home-btn");

    // Result view state
    const result = _result ?? await getResult(quizId);
    const quiz = await getQuizAll(quizId);
    const scores = await getBestScores(quizId);

    console.log(scores);

    let questionDict: {[id: number]: IQuestion}

    questionDict = {};

    quiz.questionList.forEach(question => {
        questionDict[question.id] = question;
    });

    // View renderers
    const renderAnswers = () => {
        answerList.innerHTML = "";

        Object.keys(result.answers).forEach((questionId) => {
            let answerLi = document.createElement("li") as HTMLElement;
            const id = parseInt(questionId);

            answerLi.innerText = result.answers[id].toString();

            if (result.answers[id] === questionDict[id].answer) {
                answerLi.classList.add("correct-answer");
            } else {
                answerLi.classList.add("wrong-answer");
                let penalty = document.createElement("div");
                penalty.classList.add("penalty");
                penalty.innerText = `+${questionDict[id].penalty}`;
                answerLi.appendChild(penalty)
            }

            answerList.appendChild(answerLi);
        });
    }

    const renderScore = () => {
        scoreP.innerHTML = `Twój wynik: <b>${result.score}</b> sek.`;
    }


    homeBtn.onclick = () => {
        showView(mainView());
    }

    /*
    const renderScoreList = () => {
        scoreList.innerHTML = "";

        let resultList = getResultList().sort((a, b) => {
            return a.score < b.score? -1 : 1;
        });

        if (resultList.length > 0) {
            let bestResults = resultList.slice(0, 5);

            bestResults.forEach(result => {
                let scoreLi = document.createElement("li") as HTMLElement;

                scoreLi.innerHTML = `${result.score} sek.`;

                scoreList.appendChild(scoreLi);
            });
        }
    }*/

    renderScore();
    renderAnswers();

    return view;
}

export {
    resultView
}