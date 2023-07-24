
import { Logout } from '../components/Logout';
import { useAuth } from '../utils/AuthProvider';
import { HomePage } from '../components/HomePage';
import { FetchCategories, listQuiz } from '../api';
import { LinkButton } from '../components/Buttons';
import { StyledIcon } from '../components/Icons';
import { Card, CardAdd } from '../components/Card';
import { useEffect, useState } from 'react';

export const Home = () => {
    const [quizList, setQuizList] = useState([]);
    const [categoriesList,setCategoriesList] = useState([]);
    const { isLoggedIn } = useAuth();
    useEffect(() => {
        listQuiz().then(setQuizList)
    }, [])
    useEffect(()=>{
        FetchCategories().then(setCategoriesList)
    },[])

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
            {categoriesList.map(categorie =>(
                <p key={categorie.id}>{categorie.name}</p>
            ))}

            <div className='grid'>
                {isLoggedIn ? (
                    <CardAdd style={{ backgroundColor: 'black' }} to="/FormQuiz"> </CardAdd>
                ) : null}
                    {quizList.map(quiz => (
                        <Card to={`quiz/${quiz.id}`} style={{ backgroundColor: quiz.color }} key={quiz.id}>
                            <p>{quiz.title}</p>
                        </Card>
                    ))}
            </div>
        </HomePage>
    </>

}
