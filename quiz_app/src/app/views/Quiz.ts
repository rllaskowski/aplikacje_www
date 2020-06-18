import IQuiz from "../models/IQuiz";
import ISolution from "../models/ISolution";
import IQuestion from "../models/IQuestion";
import { showView } from "./view";
import { mainView } from "./Main";

import { loginView } from "./Login";
import { getQuiz, sendSolution, getResult } from "../api";
import { resultView } from "./Result";

const quizView = async (quizId: number) : Promise<HTMLElement> => {
    // Quiz view components
    let view = document.getElementById("quiz-view");

    let nextBtn = document.getElementById("next-btn") as HTMLButtonElement;
    let prevBtn = document.getElementById("prev-btn") as HTMLButtonElement;
    let cancelBtn = document.getElementById("cancel-btn") as HTMLButtonElement;

    let timer = document.getElementById("timer");

    let quizDescription = document.getElementById("quiz-description");

    let progess = document.getElementById("progress");

    let qContent = document.getElementById("q-content");
    let ansInput = document.getElementById("ans-input") as HTMLInputElement;

    let timerHandler: NodeJS.Timeout;

    const result = await getResult(quizId);

    if (result && result.score) {
        return resultView(quizId, result);
    }

    const quiz = await getQuiz(quizId);

    if (!quiz) {
        return loginView("Upłynął czas Twojej sesji. Zaloguj się ponownie");
    }

    // Quiz view state
    let solution: ISolution;
    let questionIdx: number;
    let answered: {[id: number]: boolean};
    let question: IQuestion;
    let answeredCount: number;
    let time = 0;

    // View renderers
    const renderTimer = () => {
        timer.innerText = `${time}`;
    }
        
    const renderQuestion = () => {
        answered[question.id] = answered[question.id] ?? false;
        solution.answers[question.id] = solution.answers[question.id] ?? {
            time: 0,
            content: 0
        };

        ansInput.value = answered[question.id] ? 
            solution.answers[question.id].content.toString() : "";

        qContent.innerHTML = question.content;
    }

    const renderDescription = () => {
        quizDescription.textContent = quiz.description;
    }

    const renderProgess = () => {
        progess.innerText = `${questionIdx+1} / ${quiz.questionList.length}`;
    }

    // View events
    nextBtn.onclick = () => {
        if (questionIdx+1 < quiz.questionList.length) {
            questionIdx += 1;
            question = quiz.questionList[questionIdx];

            if (questionIdx > 0) {
                prevBtn.disabled = false;
            }
            
            if (questionIdx+1 == quiz.questionList.length) {
                nextBtn.disabled = true;
            }

            renderQuestion();
            renderProgess();
        }
    }

    prevBtn.onclick = () => {
        if (questionIdx > 0) {
            questionIdx -= 1
            question = quiz.questionList[questionIdx];

            if (questionIdx == 0) {
                prevBtn.disabled = true;
            }
            
            if (questionIdx+1 < quiz.questionList.length) {
                nextBtn.disabled = false;
            }

            renderQuestion();
            renderProgess();
        }
    }

    timer.onclick = () => {
        if (answeredCount === quiz.questionList.length) {
            clearInterval(timerHandler);
            
            for (const ans of Object.values(solution.answers)) {
                ans.time = Math.floor(ans.time*100/time);
            }

            sendSolution(solution)
                .then(() => {
                    showView(resultView(quizId));
                });
        }   
    }

    cancelBtn.onclick = () => {
        clearInterval(timerHandler);
        showView(mainView());
    }

    ansInput.onkeydown = (evt) => {
        if (evt.keyCode == 13 && ansInput.value !== "") {
            nextBtn.click();
        }
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

            solution.answers[question.id].content = parseInt(ansInput.value);
        }

        if (answeredCount === quiz.questionList.length) {
            timer.classList.remove("timer-disabled");
        } else {
            timer.classList.add("timer-disabled");
        }
    }

    questionIdx = 0;
    answered = {};
    question = quiz.questionList[0];
    answeredCount = 0;

    prevBtn.disabled = true;
    nextBtn.disabled = quiz.questionList.length == 1? true : false;

    timer.classList.add("timer-disabled");

    solution = {
        answers: {},
        quizId: quizId
    }

    renderProgess();
    renderDescription();
    renderTimer();

    timerHandler = setInterval(() => {
        renderTimer();

        time += 1;
        solution.answers[question.id].time += 1;
    }, 1000);

    renderQuestion();

    return view;
};


export {
    quizView
}