import { showView } from './view';
import { mainView } from './Main';
import { loginView } from './Login';
import { postRequest, getCookie, removeToken } from '../utils';

const accountView = async () => {
    // View components
    const view = document.getElementById("account-view");
    const submitBtn = document.getElementById("change-passw-btn") as HTMLButtonElement;
    const passw1Input = document.getElementById("passw1-input") as HTMLInputElement;
    const passw2Input = document.getElementById("passw2-input") as HTMLInputElement;
    const messageText = document.getElementById("message-text") as HTMLParagraphElement;

    messageText.textContent = "";

    submitBtn.onclick = (evt) => {
        if (!passw1Input.value || !passw2Input.value) {
            messageText.textContent = "Musisz wypełnić oba pola!";

            return;
        }

        if (passw1Input.value !== passw2Input.value) {
            messageText.textContent = "Podane hasła nie są takie same!";
            
            return;
        }

        const token = getCookie("user_session");
        const data = `token=${token}&password=${passw1Input.value}`;

        postRequest("/api/password-change", data)
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


