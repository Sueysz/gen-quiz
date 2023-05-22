import './Quiz.css'
import { getQuiz } from '../api'
import { Link, useParams, } from 'react-router-dom'
import { useState, useEffect } from "react"
import { fireConfetti } from "../utils/fireConffeti"


export const Quiz = () => {
    const { slug } = useParams();
    const [quiz, setQuiz] = useState(null)
    const [selectedAnswer, setSelectedAnswer] = useState()
    const [questionsIndex, setQuestionsIndex] = useState(0)

    useEffect(() => {
        getQuiz(slug)
        .then(setQuiz)
    }, [])
    console.log("IN",quiz)
    
    const question = quiz === null ? undefined : JSON.parse(quiz.questions).data[questionsIndex]//verifier si quiz est null quand le getquiz n'ai pas encore éffectuer ensuite on transforme le json en objet js puis ont récupère le champs
    console.log(question)
    const checkAnswer = () => {
        if (question.solution === selectedAnswer) {
            fireConfetti()
            setQuestionsIndex((i) => i + 1)
        } else {
            alert('Oups, recommencez 😓')
            setQuestionsIndex(0)
        }
    }

    if (question === undefined) {
        return (
            <>
                <div>
                    Bravo! <button><Link to="/">Retour au Quiz</Link></button>
                </div>
            </>
        )
    }

    return (
        <>
        <div id='container' style={{ backgroundColor: quiz.color }}>

            <div id='header'>
                <div id='title'>
                        <Link className='back' to="/">Back</Link>
                    <h1>{quiz ? quiz.title : ""}</h1>
                </div>
            </div>
            <div id="question">
                <h1>{question.question}</h1>
                <div id="answers">
                    {question.answers.map((btn, i) => {
                        return (
                            <button
                                key={btn}
                                className={i === selectedAnswer ? 'answer selected' : 'answer'}
                                onClick={() => setSelectedAnswer(i)}
                            >
                                {i + 1}. {btn}
                            </button>
                        )
                    })}
                    <div id="confirm">
                        <button disabled={selectedAnswer === undefined} onClick={checkAnswer}>
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}