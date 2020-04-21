import IResult from './models/IResult';


const SCORES_KEY = "best-scores"


const showView = (view: HTMLElement) => {
    return new Promise(resolve => {
        view.style.height = "auto";
              
        view.classList.remove("invisible-view");

        view.ontransitionend = () => {
            view.ontransitionend = null;
            resolve();
        }
    });
}

const hideView = (view: HTMLElement) => {
    return new Promise(resolve => {
        view.classList.add("invisible-view");
        
        view.ontransitionend = () => {
            view.style.height = "0px";

            view.ontransitionend = null;
            resolve();
        }
    });
}

const getResultList = (): IResult[] => {
    return JSON.parse(localStorage.getItem(SCORES_KEY) ?? "[]");
}

const saveResult = (result: IResult) => {
    let resultList = [...getResultList(), result];

    localStorage.setItem(SCORES_KEY, JSON.stringify(resultList));
}



export {
    showView,
    hideView,
    getResultList,
    saveResult
}