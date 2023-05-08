import './Home.css'
import { listQuiz } from '../api'
import { Link } from 'react-router-dom';

export const Home = () => {
    const quizList = listQuiz();

    return <>
        <div id='Home'>
            <div className='log'>
                <button><Link to="/login">Login</Link></button>
            </div>
            <h1>👇Choisi ton quiz👇</h1>

            <div className='grid'>
                {quizList.map(quiz => {
                    return <a href={`quiz/${quiz.slug}`} className='card' style={{ backgroundColor: quiz.color }} key={quiz.id}>
                        <div>{quiz.title}</div>
                    </a>
                })}
            </div>
        </div>
    </>

}
