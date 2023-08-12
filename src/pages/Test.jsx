// import { useState } from "react"

//page ou je fais des test quand j'ai envie d'essayer des function ou des hooks ou des rendu visuel

import { Link } from 'react-router-dom';
import './Test.css'
import { useState } from "react";

// export const Test =()=>{
//     const [fruitsIndex, setFruitsIndex] = useState(0)
//     const fruits = [
//         "fraise 🍓",
//         "abricot 🍑",
//         "Ananas 🍍",
//     ]
//     return <>
//         <button onClick={()=> setFruitsIndex(Math.floor(Math.random() * fruits.length))}>
//             {fruits[fruitsIndex]}
//         </button>
//     </>
// }

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


export const Test = () => {
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
            <div color="">bravo <button ><Link to="/">Retour au Quiz</Link></button></div>
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




import styled from "@emotion/styled";

export const HomePage = styled.div`
    h1{
        text-align:center;
    }

    .log{
        display:flex;
        flex-direction:row-reverse;
    }
    .grid{
        gap: 20px;
        display: flex;
        flex-wrap: wrap;
    }

    

`