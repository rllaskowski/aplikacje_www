interface IQuestion {
    id?: number;
    content: string;
    answer?: number;
    penalty?: number;
    totalTime?: number;
    correctNum?: number;
}

export default IQuestion;