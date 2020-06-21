import { showView, View } from "./view";
import IResult from "../models/IResult";
import { getResult, getQuizAll, getBestScores } from "../api";
import IQuestion from "../models/IQuestion";
import { mainView } from "./Main";

const resultView = async (quizId: number, _result: IResult = null): Promise<View> => {
    // Result view components
    const view = document.getElementById("result-view");
    const answerList = document.getElementById("answer-list");
    const scoreP = document.getElementById("score");
    const homeBtn = document.getElementById("home-btn");
    const scoreList = document.getElementById("score-list");

    // Result view state
    const result = _result ?? await getResult(quizId);
    const quiz = await getQuizAll(quizId);
    const scores = await getBestScores(quizId);

    let questionDict: {[id: number]: IQuestion}

    questionDict = {};

    quiz.questionList.forEach(question => {
        questionDict[question.id] = question;
    });

    console.log(questionDict);

    // View renderers
    const renderAnswers = () => {
        answerList.innerHTML = "";

        Object.keys(result.answers).forEach((questionId) => {
            const id = parseInt(questionId);
            
            const questionLi = document.createElement("li") as HTMLElement;
            const answerDiv = document.createElement("div") as HTMLElement;
            questionLi.innerHTML = `<p>${questionDict[id].content}</p>`;
            
            answerDiv.innerText = `${result.answers[id]}`;
            answerDiv.classList.add("question-result");

            if (result.answers[id] === questionDict[id].answer) {
                answerDiv.classList.add("correct-answer");
            } else {
                answerDiv.classList.add("wrong-answer");
                const penalty = document.createElement("div");
                const correctAnswer = document.createElement("div");
                penalty.classList.add("penalty");
                correctAnswer.classList.add("good-answer");
                penalty.innerText = `+${questionDict[id].penalty}`;
                correctAnswer.innerText = `${questionDict[id].answer}`;
                answerDiv.appendChild(penalty);
                answerDiv.appendChild(correctAnswer);
            }
            questionLi.appendChild(answerDiv);

            if (questionDict[id].correctNum === 0) {    
                questionLi.innerHTML += `<p>Średni czas na poprawną odpowiedź: ---</p>`;
            } else {
                const avgTime = Math.floor(questionDict[id].totalTime/questionDict[id].correctNum*10)/10.0;
                questionLi.innerHTML += `<p>Średni czas na poprawną odpowiedź: ${avgTime}sek.</p>`;
            }
            answerList.appendChild(questionLi);
        });
    }

    const renderScore = () => {
        scoreP.innerHTML = `Twój wynik: <b>${result.score}</b> sek.`;
    }


    homeBtn.onclick = () => {
        showView(mainView());
    }
    
    const renderScoreList = () => {
        scoreList.innerHTML = "";

        const resultList = scores.sort((a, b) => {
            return a.score < b.score? -1 : 1;
        });

        if (resultList.length > 0) {
            const bestResults = resultList.slice(0, 5);

            bestResults.forEach(result => {
                const scoreLi = document.createElement("li") as HTMLElement;

                scoreLi.innerHTML = `${result.score} sek.`;

                scoreList.appendChild(scoreLi);
            });
        }
    }

    renderScoreList();
    renderScore();
    renderAnswers();

    return view;
}

export {
    resultView
}