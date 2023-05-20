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

    const question = questions[questionsIndex]

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
            <div id='header'>
                <div id='title'>
                    <button>
                        <Link to="/">Back ←</Link>
                    </button>
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
        </>
    )
}