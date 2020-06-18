import IQuiz from "../models/IQuiz";
import { postRequest, getToken } from "../utils";
import ISolution from "../models/ISolution";
import IResult from "../models/IResult";
import { response } from "express";

const getQuiz = async (id: number) => {
    const data = await postRequest(`/api/quiz`, `id=${id}`);

    if (data.status === 200) {
        return JSON.parse(data.response) as IQuiz;
    } else {
        return null;
    }
}

const getQuizAll = async (id: number) => {
    const data = await postRequest(`/api/quiz-all`, `id=${id}`);

    if (data.status === 200) {
        return JSON.parse(data.response) as IQuiz;
    } else {
        return null;
    }
}

const getQuizList = async () => {
    const data = await postRequest("/api/quiz-list");
    
    if (data.status === 200) {
        return JSON.parse(data.response) as {name: string, id: number, questionNum: number}[]; 
    } else {
        return null;
    } 
}

const sendSolution = async (result: ISolution) => {
    const solutionJson = JSON.stringify(result);

    const data = await postRequest(`/api/send-solution`, `solution=${solutionJson}`);
    
    if (data.status === 200) {
        return 200; 
    } else {
        return null;
    } 
}

const getResult = async (quizId: number) => {
    const data = await postRequest(`/api/get-result`, `quizId=${quizId}`);
    
    if (data.status === 200) {
        return JSON.parse(data.response) as IResult;
    } else {
        return null;
    } 
}


const getBestScores = async (quizId: number) => {
    const data = await postRequest(`/api/best-scores`, `quizId=${quizId}`);
    
    if (data.status === 200) {
        return JSON.parse(data.response);
    } else {
        return null;
    } 
}

export {
    getQuiz,
    getQuizAll,
    getQuizList,
    sendSolution,
    getResult,
    getBestScores
}
