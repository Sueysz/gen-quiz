import { Logout } from './Logout';
import { useAuth } from '../utils/AuthProvider';
import { HomePage } from '../components/HomePage';
import { fetchCategories, getQuizCategories, listQuiz } from '../api';
import { Btn, LinkButton } from '../components/Buttons';
import { StyledIcon } from '../components/Icons';
import { Card, CardAdd } from '../components/Card';
import { useEffect, useState } from 'react';

export const Home = () => {

    //mes states qui stock de la données
    const [quizList, setQuizList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [categoriesQuiz, setCategoriesQuiz] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredQuizList, setFilteredQuizList] = useState([]);
    const { isLoggedIn } = useAuth();

    // Effect pour charger les données initiales (quiz, catégories et relation)
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

    // Effect pour filtrer la liste des quiz en fonction de la catégorie sélectionnée
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

    // Gestionnaire de sélection de catégorie
    const handleCategorySelection = (categoryId) => {
        setSelectedCategory(categoryId);
    };
    
    //Gestionnaire de réinitialisation de la sélection de catégorie
    const handleResetCategorySelection = () => {
        setSelectedCategory('');
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
                        <LinkButton to='/login'>Log-In</LinkButton>
                    )}
                </div>
            </div>
            <h1>👇Choose Your Quiz👇</h1>
            <div className='grid'>
                {/* Sélecteur de categories*/}
                <Btn style={{width:'5rem', cursor:'pointer'}} onClick={()=> handleResetCategorySelection()}>
                        all
                </Btn>
                {categoriesList.map((categorie) => (
                    <Btn style={{width:'5rem', cursor:'pointer'}} onClick={() => handleCategorySelection(categorie.id)} key={categorie.id}>
                        {categorie.name}
                    </Btn>
                ))}
            </div>
            
            {/* Affichage des cartes de quiz */}
            <div className='grid'>
                {/* Bouton pour ajouter un nouveau quiz, affiché si l'utilisateur est connecté */}
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
