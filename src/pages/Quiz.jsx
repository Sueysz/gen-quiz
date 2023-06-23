
import { getQuiz } from '../api'
import { Link, useParams, } from 'react-router-dom'
import { useState, useEffect, useMemo, useCallback } from "react"
import { fireConfetti } from "../utils/fireConffeti"
import  styled  from '@emotion/styled'
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
    const [quiz, setQuiz] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [questionsIndex, setQuestionsIndex] = useState(0);
    const [score, setscore] = useState(0);
    const [incorrectAnswers, setIncorectAnswers] = useState(0);

    useEffect(() => {
        getQuiz(slug)
            .then(setQuiz)
    }, [slug]);

    const question = useMemo(() => {
        if (quiz === null) {
            return undefined;
        } else {
            return quiz.questions[questionsIndex];
        }
    }, [quiz, questionsIndex]);

    const checkAnswer = useCallback(() => {
        if (question.solution === selectedAnswer) {
            fireConfetti();
            setscore((prevScore) => prevScore + 1);

        } else {
            setIncorectAnswers((prevIncorrectAnswsers) => prevIncorrectAnswsers + 1);
        }
        setQuestionsIndex((i) => i + 1);
    }, [question, selectedAnswer]);

    if (question === undefined) {
        return (
            <>
                <div>
                    Bravo! <button><Link to="/">back to Quiz</Link></button>
                    <p>Score: {score}</p>
                    <p>Incorrect Answers: {incorrectAnswers}</p>
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