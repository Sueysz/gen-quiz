
import { HomePage } from '../components/HomePage';
import { Card, CardAdd } from '../components/Card';
import { listQuiz } from '../api'
import { LoginButton } from '../components/Buttons';
import { useEffect, useState } from 'react';
import { StyledIcon } from '../components/Icons';

export const Home = () => {
    const [quizList, setQuizList] = useState([]);
    useEffect(() => {
        listQuiz().then(setQuizList)
    }, [])

    return <>
        <HomePage>
            <div className='wrapper'>
                <StyledIcon />
                <LoginButton to="/login">Login</LoginButton>
            </div>
            <h1>👇Choisi ton quiz👇</h1>

            <div className='grid'>
                {quizList.map(quiz => {
                    return <Card to={`quiz/${quiz.slug}`} style={{ backgroundColor: quiz.color }} key={quiz.id}>
                        <div>{quiz.title}</div>
                    </Card>
                })}

                <CardAdd style={{ backgroundColor: 'black' }} to="/FormQuiz"> + </CardAdd>
            </div>
        </HomePage>
    </>

}
