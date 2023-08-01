import { Logout } from '../components/Logout';
import { useAuth } from '../utils/AuthProvider';
import { HomePage } from '../components/HomePage';
import { fetchCategories, getQuizCategories, listQuiz } from '../api';
import { Btn, LinkButton } from '../components/Buttons';
import { StyledIcon } from '../components/Icons';
import { Card, CardAdd } from '../components/Card';
import { useEffect, useState } from 'react';

export const Home = () => {
    const [quizList, setQuizList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [categoriesQuiz, setCategoriesQuiz] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredQuizList, setFilteredQuizList] = useState([]);
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        Promise.all([listQuiz(), fetchCategories(), getQuizCategories()])
            .then(([quizData, categoriesData, categoriesQuizData]) => {
                setQuizList(quizData);
                setCategoriesList(categoriesData);
                setCategoriesQuiz(categoriesQuizData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        if (selectedCategory === '') {
            setFilteredQuizList(quizList);
        } else {
            const filteredQuizzes = quizList.filter((quiz) =>
                categoriesQuiz.some(
                    (category) => category.quiz_id === quiz.id && category.category_id === selectedCategory
                )
            );
            setFilteredQuizList(filteredQuizzes);
        }
    }, [selectedCategory, categoriesQuiz, quizList]);

    const handleCategorySelection = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    return (
        <HomePage>
            <div className='wrapper'>
                <div>
                    <StyledIcon src='/icons/logo.png' alt='logo' />
                </div>
                <div className='userAuthReg'>
                    {isLoggedIn ? (
                        <>
                            <Logout />
                            <LinkButton to='/profile'>Profile</LinkButton>
                        </>
                    ) : (
                        <LinkButton to='/login'>LogIn</LinkButton>
                    )}
                </div>
            </div>
            <h1>👇Choose Your Quiz👇</h1>
            <div className='grid'>
                {categoriesList.map((categorie) => (
                    <Btn style={{width:'4rem'}} onClick={() => handleCategorySelection(categorie.id)} key={categorie.id}>
                        {categorie.name}
                    </Btn>
                ))}
            </div>

            <div className='grid'>
                {isLoggedIn ? <CardAdd style={{ backgroundColor: 'black' }} to='/FormQuiz' /> : null}
                {filteredQuizList.map((quiz) => (
                    <Card to={`quiz/${quiz.id}`} style={{ backgroundColor: quiz.color }} key={quiz.id}>
                        <p>{quiz.title}</p>
                    </Card>
                ))}
            </div>
        </HomePage>
    );
};
