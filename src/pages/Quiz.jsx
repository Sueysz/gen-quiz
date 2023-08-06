
import styled from '@emotion/styled'
import { getQuiz } from '../api'
import { fireConfetti } from "../utils/fireConffeti"
import { Answer, Answers, QuestionsIndex } from '../components/Quiz'
import { Link, useParams, } from 'react-router-dom'
import { QuestionContainer } from '../components/QuestionContainer'
import { LinkButton, ValidationButton } from '../components/Buttons'
import { useState, useEffect, useMemo, useCallback } from "react"

const Container = styled.div`
    height: 100vh;
    position: absolute;
    top:0;
    left:0;
    width:100%;
    overflow:auto
`
const TitleContainer = styled.div`
    display: flex;
    gap: 30px;
    color: #fafafa;
`

export const Quiz = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [questionsIndex, setQuestionsIndex] = useState(0);
    const [score, setscore] = useState(0);
    const [incorrectAnswers, setIncorectAnswers] = useState(0);
    const currentQuestionNumber = questionsIndex + 1;
    const totalQuestions = quiz?.questions?.length || 0;

    useEffect(() => {
        getQuiz(id)
            .then(setQuiz)
    }, [id]);

    const question = useMemo(() => {
        if (quiz === null) {
            return undefined;
        } else {
            return quiz.questions[questionsIndex];
        }
    }, [quiz, questionsIndex]);

    const checkAnswer = useCallback(() => {
        if (question.solution === selectedAnswer) {
            fireConfetti([
                '#FFFFFF',
                '#14BB69',
                '#14BB69',
                '#14BB69',
                '#50e283',
                '#569d71',
                '#196d42',
                '#02660c',
            ]);
            setscore((prevScore) => prevScore + 1);

        } else {
            fireConfetti([
                '#ff9393',
                '#FF7F21',
                '#E8571E',
                '#EB6965',
                '#FF4A2F',
                '#FF5447',
                '#E81E27',
                '#EB0602'
            ])
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
                        <LinkButton className='back' to="/">Back</LinkButton>
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
                        <QuestionsIndex>Question {currentQuestionNumber} / {totalQuestions}</QuestionsIndex>
                    </Answers>
                </QuestionContainer>
            </Container>
        </>
    )
}