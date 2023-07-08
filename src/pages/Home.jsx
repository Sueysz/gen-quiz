
import { Logout } from '../components/Logout';
import { useAuth } from '../utils/AuthProvider';
import { HomePage } from '../components/HomePage';
import { listQuiz } from '../api';
import { LinkButton } from '../components/Buttons';
import { StyledIcon } from '../components/Icons';
import { Card, CardAdd } from '../components/Card';
import { useEffect, useState } from 'react';

export const Home = () => {
    const [quizList, setQuizList] = useState([]);
    const { isLoggedIn } = useAuth();
    useEffect(() => {
        listQuiz().then(setQuizList)
    }, [])

    return <>
        <HomePage>
            <div className='wrapper'>
                <div>
                    <StyledIcon src='/icons/logo.png' alt='logo' />
                </div>
                <div className='userAuthReg'>
                    {isLoggedIn ? (
                        <>
                            <Logout />
                            <LinkButton to="/profile"> Profile</LinkButton>
                        </>
                    ) : (
                        <LinkButton to="/login">LogIn </LinkButton>
                    )}

                </div>
            </div>
            <h1>👇Choose Your Quiz👇</h1>

            <div className='grid'>
                {isLoggedIn ? (
                    <CardAdd style={{ backgroundColor: 'black' }} to="/FormQuiz"> </CardAdd>
                ) : null}
                {quizList.map(quiz => (
                    <Card to={`quiz/${quiz.slug}`} style={{ backgroundColor: quiz.color }} key={quiz.id}>
                        <p>{quiz.title}</p>
                    </Card>
                ))}
            </div>
        </HomePage>
    </>

}
