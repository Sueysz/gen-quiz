import { Link } from "react-router-dom"
import { ConfirmButton } from "../components/Buttons"
import { FormPage } from "../components/FormPage"
import { StyledIcon } from "../components/Icons"
import { useCallback, useState } from "react"
import { createQuiz } from "../api"



export const FormQuiz = () => {
    const [quizData, setQuizData] = useState({
        title: "",
        color: "#000000",
        questions: [],
    })

    const { title, color, questions } = quizData

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setQuizData({ ...quizData, [name]: value });
    }

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();

        console.log(quizData)
        await createQuiz(title, color, questions)
        setQuizData({
            title: '',
            color: '#000000',
            questions: []
        })

    })
    return (
        <>
            <FormPage>
                <Link to={'/'}>
                    <StyledIcon src='/icons/logo.png' alt='logo' />
                </Link>
                <h1>🫣Add your Quiz🫣</h1>
                <form onSubmit={handleSubmit} >
                    <input
                        placeholder="title"
                        type="text"
                        name="title"
                        value={quizData.title}
                        onChange={handleInputChange}
                    />
                    <input
                        type="color"
                        name="color"
                        value={quizData.color}
                        onChange={handleInputChange}
                    />
                    <textarea 
                    name="questions" 
                    cols="30" 
                    rows="10"
                    value={quizData.questions}
                    onChange={handleInputChange}
                    />
                    
                    <ConfirmButton type="submit"> Create </ConfirmButton>
                </form>
            </FormPage>
        </>
    )
}
