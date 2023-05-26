
import { getQuiz } from '../api'
import { Link, useParams, } from 'react-router-dom'
import { useState, useEffect } from "react"
import { fireConfetti } from "../utils/fireConffeti"
import styled from '@emotion/styled'
import { Answer, Answers } from '../components/Answers'
import { QuestionContainer } from '../components/QuestionContainer'
import { BackButton, ValidationButton } from '../components/Buttons'

const Container = styled.div`
    height:100vh;
`
const TitleContainer = styled.div`
    display: flex;
    gap: 30px;
    color: #fafafa;
`

export const Quiz = () => {
    const { slug } = useParams();
    const [quiz, setQuiz] = useState(null)
    const [selectedAnswer, setSelectedAnswer] = useState()
    const [questionsIndex, setQuestionsIndex] = useState(0)

    useEffect(() => {
        getQuiz(slug)
            .then(setQuiz)
    }, [])
    console.log("IN", quiz)

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
            <Container style={{ backgroundColor: quiz.color }}>

                <div id='header'>
                    <TitleContainer>
                        <BackButton className='back' to="/">Back</BackButton>
                        <h1>{quiz ? quiz.title : ""}</h1>
                    </TitleContainer>
                </div>
                <QuestionContainer>
                    <h1>{question.question}</h1>
                    <Answers>
                        {question.answers.map((btn, i) => {
                            return (
                                <Answer
                                    key={btn}
                                    color='#fafafa'
                                    selected={i === selectedAnswer}
                                    onClick={() => setSelectedAnswer(i)}
                                >
                                    {i + 1}. {btn}
                                </Answer>
                            )
                        })}
                        <ValidationButton disabled={selectedAnswer === undefined} onClick={checkAnswer}>
                            Confirm
                        </ValidationButton>
                    </Answers>
                </QuestionContainer>
            </Container>
        </>
    )
}