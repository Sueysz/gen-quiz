import { getQuiz } from "../api";
import { useParams } from "react-router-dom"


export const Quiz = () => {
    const { id } = useParams();
    const quiz = getQuiz(id)
    return <div> {quiz.title}</div>


}
