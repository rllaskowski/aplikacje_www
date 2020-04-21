import { hideView, showView } from '../utils';
import { showQuiz } from './Quiz';
import { quizList } from '../constants/sampleData';
import { getResultList } from '../utils';
// View components
let startBtn = document.getElementById("start-btn");
let mainView = document.getElementById("main-view");
let scoreList = document.getElementById("score-list");

// View renders

const renderScoreList = () => {
    scoreList.innerHTML = "";

    let resultList = getResultList();

    resultList.sort((a, b) => {
        return a.score < b.score? -1 : 1;
    });


    resultList.forEach(result => {
        let scoreLi = document.createElement("li") as HTMLElement;

        scoreLi.innerHTML = result.score.toString();

        scoreList.appendChild(scoreLi);
    });
}


// View events
startBtn.onclick = () => {
    hideView(mainView).then(() => showQuiz(quizList[0]));
}

const showMain = () => {
    renderScoreList();
    
    return showView(mainView);
}

export {
    showMain
}


