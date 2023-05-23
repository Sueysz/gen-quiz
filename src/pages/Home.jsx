
import styled from '@emotion/styled';
import { Card } from '../components/Card';
import { listQuiz } from '../api'
import { LoginButton } from '../components/Buttons';
import { useEffect, useState } from 'react';


const HomePage = styled.div`
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
