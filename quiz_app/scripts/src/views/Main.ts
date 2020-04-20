import { hideView, showView } from '../utils';
import { showQuiz } from './Quiz';
import { quizList } from '../constants/sampleData';

// View components
let startBtn = document.getElementById("start-btn");
let mainView = document.getElementById("main-view");


// View events
startBtn.onclick = () => {
    hideView(mainView).then(() => showQuiz(quizList[0]));
}

const showMain = () => {
    showView(mainView);
}

export {
    showMain
}


