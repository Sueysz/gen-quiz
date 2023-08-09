
import styled from '@emotion/styled'
import { getQuiz } from '../api'
import { fireConfetti } from "../utils/fireConffeti"
import { Answer, Answers, QuestionsIndex } from '../components/Quiz'
import { useParams, } from 'react-router-dom'
import { QuestionContainer } from '../components/QuestionContainer'
import { LinkButton, ValidationButton } from '../components/Buttons'
import { useState, useEffect, useMemo, useCallback } from "react"
import { Result } from './Result'

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

    // Utilisation de useParams pour obtenir l'ID du quiz depuis l'URL
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [questionsIndex, setQuestionsIndex] = useState(0);
    const [score, setscore] = useState(0);
    const [incorrectAnswers, setIncorectAnswers] = useState(0);
    const currentQuestionNumber = questionsIndex + 1;
    const totalQuestions = quiz?.questions?.length || 0;

    // Effet pour charger les données du quiz en fonction de l'ID
    useEffect(() => {
        getQuiz(id)
            .then(setQuiz)
    }, [id]);

    // Utilisation de useMemo pour obtenir la question actuelle (j'ai fait ce système comme je ne savais pas combien de quiz un user aller crée)
    const question = useMemo(() => {
        if (quiz === null) {
            return undefined;
        } else {
            return quiz.questions[questionsIndex];
        }
    }, [quiz, questionsIndex]);

    // Gestionnaire pour vérifier la réponse et mettre à jour le score
    const checkAnswer = useCallback(() => {
        if (question.solution === selectedAnswer) {
            // Si la réponse est correcte, jouer des confettis et incrémenter le score
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
            // Si la réponse est incorrecte, jouer des confettis et incrémenter le nombre de réponses incorrectes
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
        // Passer à la question suivante
        setQuestionsIndex((i) => i + 1);
    }, [question, selectedAnswer]);

    // Si aucune question n'est disponible, afficher les résultats du quiz
    if (question === undefined) {
        return (
                <Result score={score} incorrectAnswers={incorrectAnswers}/>
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