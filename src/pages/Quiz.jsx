import './Quiz.css'
import { getQuiz } from '../api'
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import { fireConfetti } from "../utils/fireConffeti"

const questions = [
    {
        question: 'quel est mon plat préféré ?🤤',
        answers: [
            '🍔 les burgers',
            '🍙 les onigiris',
            '🍟 les frites'
        ],
        solution: 0
    },
    {
        question: "quel language n'existe pas ?🤔",
        answers: [
            'javascript',
            'Pithon',
            'coffe-script'
        ],
        solution: 1
    },
    {
        question: 'sun préfère quel endroit pour ses vacances ?⛷️',
        answers: [
            'Sa chambre',
            "L'Angleterre",
            'Lille'
        ],
        solution: 0
    }
]

export const Quiz = () => {
    const { slug } = useParams();
    const [quiz, setQuiz] = useState(null)
    const [selectedAnswer, setSelectedAnswer] = useState()
    const [questionsIndex, setQuestionsIndex] = useState(0)

    useEffect(() => {
        const currentQuiz = getQuiz(slug);
        setQuiz(currentQuiz)
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
                        Back ←
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