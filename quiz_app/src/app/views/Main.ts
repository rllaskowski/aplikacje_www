import { showView, View } from "./view";
import { quizView } from "./Quiz";
import { removeToken } from "../utils";
import { getQuizList } from "../api";
import { accountView } from "./Account";
import { loginView } from "./Login";

const mainView = async (): Promise<View> => {
    // View components
    const view = document.getElementById("main-view");

    const quizStartList = document.getElementById("quiz-list");

    const accountLink = document.getElementById("account-link");
    const signoutLink = document.getElementById("signout-link");

    const quizList = await getQuizList();

    if (!quizList) {
        return loginView("Upłynął czas Twojej sesji. Zaloguj się ponownie");
    }


    accountLink.onclick = () => {
        showView(accountView());
    }

    signoutLink.onclick = () => {
        removeToken();

        showView(loginView("Pomyślnie wylogowano"));
    }

    // View renderers
    const renderQuizList = () => {
        quizStartList.innerHTML = "";

        quizList.forEach(quiz => {
            const quizStartBtn = document.createElement("button");
            const questionNum = document.createElement("div");
            
            questionNum.innerText = quiz.questionNum.toString();
            questionNum.classList.add("question-num");

            quizStartBtn.textContent = quiz.name;
            quizStartBtn.appendChild(questionNum);

            quizStartBtn.onclick = () => {
                showView(quizView(quiz.id));
            }

            quizStartList.appendChild(quizStartBtn);
        });
    }

    renderQuizList();

    return view;
}

export {
    mainView
}


