
import { listQuiz } from '../api'
import { useEffect, useState } from 'react';
import { LoginButton } from '../components/Buttons';
import { HomePage } from '../components/HomePage';
import { Card } from '../components/Card';

export const Home = () => {
    const [quizList, setQuizList] = useState([]);
    useEffect(() => {
        listQuiz().then(setQuizList)
    }, [])

    return <>
        <HomePage>
            <div className='log'>
                <LoginButton to="/login">Login</LoginButton>
            </div>
            <h1>👇Choisi ton quiz👇</h1>

            <div className='grid'>
                {quizList.map(quiz => {
                    return <Card to={`quiz/${quiz.slug}`} style={{ backgroundColor: quiz.color }} key={quiz.id}>
                        <div>{quiz.title}</div>
                    </Card>
                })}
            </div>
        </HomePage>
    </>

}
