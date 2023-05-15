// import { getQuiz } from "../api";
// import { useParams } from "react-router-dom"

import { useState } from "react"
import {Link} from 'react-router-dom'
import './home.css'


const questions = [
    {
        question: 'quel est mon plat préféré',
        answers: [
            '🍔 les burgers',
            '🍙 les onigiris',
            '🍟 les frites'
        ],
        solution: 0
    },
    {
        question: "quel language n'existe pas ?",
        answers: [
            'javascript',
            'Pithon',
            'coffe-script'
        ],
        solution: 1
    },
    {
        question: 'sun préfére quel endroit pour ces vacances ?',
        answers: [
            'Sa chambre',
            "L'angletère",
            'Lille'
        ],
        solution: 0
    }
]


export const Quiz = () => {
    const [selectedAnswer, setSelectedAnswer] = useState()
    const [questionsIndex, setQuestionsIndex] = useState(0)
    const question = questions[questionsIndex]

    const checkAnswer = () => {
        if (question.solution === selectedAnswer) {
            setQuestionsIndex((i) => i + 1)
        } else {
            setQuestionsIndex(0)
        }
        
    }
    if(question === undefined){
        return<>
            <div>bravo <button ><Link to="/">Retour au Quiz</Link></button></div>
        </>
    }

    return <>
        <h1>{question.question}</h1>
        {question.answers.map((btn, i) => {
            return <button key={btn} className={i === selectedAnswer ? 'answer selected' : 'answer'} onClick={() => setSelectedAnswer(i)}>{i + 1}. {btn}</button>
        })};
        <div>
            <button disabled={selectedAnswer === undefined} onClick={checkAnswer}>
                Confirm
                </button>
        </div>
    </>

}
