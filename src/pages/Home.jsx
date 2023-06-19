
import { HomePage } from '../components/HomePage';
import { Card, CardAdd } from '../components/Card';
import { listQuiz } from '../api';
import { LoginButton, ProfileUser } from '../components/Buttons';
import { useEffect, useState } from 'react';
import { StyledIcon } from '../components/Icons';
import { Logout } from '../components/Logout';
import { useAuth } from '../utils/AuthProvider';

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
                    <StyledIcon src='/public/icons/logo.png' alt='logo' />
                </div>
                <div className='userAuthReg'>
                    {isLoggedIn ? (
                        <>
                        <Logout />
                        <ProfileUser to="/profile"> Profile</ProfileUser>
                        </>
                    ) : (
                            <LoginButton to="/login">LogIn </LoginButton>
                    )}

                </div>
            </div>
            <h1>👇Choisi ton quiz👇</h1>

            <div className='grid'>
                <CardAdd style={{ backgroundColor: 'black' }} to="/FormQuiz"> + </CardAdd>
                {quizList.map(quiz => {
                    return <Card to={`quiz/${quiz.slug}`} style={{ backgroundColor: quiz.color }} key={quiz.id}>
                        <div>{quiz.title}</div>
                    </Card>
                })}
            </div>
        </HomePage>
    </>

}
