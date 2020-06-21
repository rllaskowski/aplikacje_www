import { showView, View } from './view';
import { mainView } from './Main';
import { loginView } from './Login';
import { postRequest, removeToken } from '../utils';

const accountView = async (): Promise<View> => {
    // View components
    const view = document.getElementById("account-view");
    const submitBtn = document.getElementById("change-passw-btn") as HTMLButtonElement;
    const passw1Input = document.getElementById("passw1-input") as HTMLInputElement;
    const passw2Input = document.getElementById("passw2-input") as HTMLInputElement;
    const messageText = document.getElementById("message-text") as HTMLParagraphElement;
    const homeBtn = document.getElementById("home-link") as HTMLButtonElement;

    homeBtn.onclick = () => {
        showView(mainView());
    }

    messageText.textContent = "";

    submitBtn.onclick = () => {
        if (!passw1Input.value || !passw2Input.value) {
            messageText.textContent = "Musisz wypełnić oba pola!";
            return;
        }

        if (passw1Input.value !== passw2Input.value) {
            messageText.textContent = "Podane hasła nie są takie same!";
            return;
        }

        postRequest("/api/password-change", `password=${passw1Input.value}`)
            .then(res => {
                if (res.status === 200) {
                    removeToken();

                    showView(loginView("Pomyślnie zmieniono hasło"));
                
                } else {if (res.status == 401) {
                    messageText.textContent = "Wystąpił błąd przy zmianie hasła";}
                }
            });
    };

    return view;
}

export {
    accountView
}


