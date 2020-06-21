import { showView, View } from './view';
import { mainView } from './Main';
import { postRequest } from '../utils';

const loginView = async (status: string = ""): Promise<View> => {
    // View components
    const view = document.getElementById("login-view");
    const loginBtn = document.getElementById("login-btn") as HTMLButtonElement;
    const usernameInput = document.getElementById("username-input") as HTMLInputElement;
    const passwInput = document.getElementById("passw-input") as HTMLInputElement;
    const statusText = document.getElementById("status-text") as HTMLParagraphElement;

    statusText.textContent = status;

    loginBtn.onclick = () => {
        const data = `username=${usernameInput.value}&password=${passwInput.value}`;

        postRequest("/api/login", data)
            .then(res => {
                if (res.status === 200) {
                    showView(mainView());
                
                } else if (res.status === 401) {
                    statusText.textContent = "Niepoprawne dane logowania!";
                } else {
                    statusText.textContent = "Wystąpił błąd po stronie serwera";
                }
            });
    };

    return view;
}

export {
    loginView
}


