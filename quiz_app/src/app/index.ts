import { loginView } from "./views/Login";
import { mainView } from "./views/Main";

import { postRequest, getToken } from "./utils";
import { showView } from "./views/view";

const startApp = async () => {
    let logined = false;

    if (getToken()) {
        const res = await postRequest("/api/login");

        if (res.status === 200) {
            logined = true;
        }
    }

    if (logined) {
        showView(mainView());
    } else {
        showView(loginView());
    }
}

startApp();