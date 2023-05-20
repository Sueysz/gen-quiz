import './Home.css'
import { listQuiz } from '../api'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const Home = () => {
    const [quizList, setQuizList] = useState([]);
    useEffect(() => {
        listQuiz().then(setQuizList)
    }, [])

    return <>
        <div id='Home'>
            <div className='log'>
                <button><Link to="/login">Login</Link></button>
            </div>
            <h1>👇Choisi ton quiz👇</h1>

            <div className='grid'>
                {quizList.map(quiz => {
                    return <Link to={`quiz/${quiz.slug}`} className='card' style={{ backgroundColor: quiz.color }} key={quiz.id}>
                        <div>{quiz.title}</div>
                    </Link>
                })}
            </div>
        </div>
    </>

}
