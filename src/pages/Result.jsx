import React from 'react'
import { Link } from 'react-router-dom'

//props score est incorrectAnswers vienne de Quiz ou les states sont gérer
export const Result = ({score, incorrectAnswers}) => {
    return (
        <div>
            Bravo! <button><Link to="/">back to Quiz</Link></button>
            <p>Score: {score}</p>
            <p>Incorrect Answers: {incorrectAnswers}</p>
        </div>
    )
}
