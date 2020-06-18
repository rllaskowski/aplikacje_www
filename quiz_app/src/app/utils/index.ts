const TOKEN_KEY = "user_session";


const getCookie = (name: string) => {
    const match = document.cookie.match(new RegExp('(^| )'+name+'=([^;]+)'));

    if (match) {
       return match[2];
    } else {
        return null;
    }
}

const removeCookie = (name: string) => {
    document.cookie = `${name}= ;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

const getToken = () => {
    return getCookie(TOKEN_KEY);
}

const removeToken = () => {
    removeCookie(TOKEN_KEY);
}
const postRequest = (url: string, data: string = "") => {
    const token = getToken();
    if (token) {
        data +=`&token=${token}`;
    }
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    return new Promise<{status: number, response: any}>((resolve) => {
        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE) {
                resolve({
                    status: this.status,
                    response: this.response
                });
            }
        }
        xhr.send(data);
    });
}

export {
    postRequest,
    getCookie,
    getToken,
    removeToken
}