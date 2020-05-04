import { hideView, showView } from '../utils';
import { showQuiz } from './Quiz';
import { quizList } from '../constants/sampleData';
import { getResultList } from '../utils';
// View components
let mainView = document.getElementById("main-view");
let scoreList = document.getElementById("score-list");
let quizStartList = document.getElementById("quiz-list");

// View renders

const renderQuizList = () => {
    quizStartList.innerHTML = "";

    quizList.forEach(quiz => {
        const quizStartBtn = document.createElement("button");
        const questionNum = document.createElement("div");
        
        questionNum.innerText = quiz.questionList.length.toString();
        questionNum.classList.add("question-num");

        quizStartBtn.textContent = quiz.name;
        quizStartBtn.appendChild(questionNum);

        quizStartBtn.onclick = () => {
            hideView(mainView).then(() => showQuiz(quiz));
        }

        quizStartList.appendChild(quizStartBtn);
    });
}


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
}


const showMain = () => {
    renderQuizList();
    renderScoreList();
    
    return showView(mainView);
}

export {
    showMain
}


