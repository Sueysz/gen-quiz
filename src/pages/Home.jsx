import { useAuth } from '../utils/AuthProvider';
import { HomePage } from '../components/HomePage';
import { fetchCategories, getQuizCategories, listQuiz } from '../api';
import { useEffect, useState } from 'react';
import { UserAuthProfile } from '../components/UserAuthProfile';
import { CategorySelector } from '../components/CategorySelector';
import { QuizList } from '../components/QuizList';

export const Home = () => {

    //mes states qui stock de la données
    const [quizList, setQuizList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [categoriesQuiz, setCategoriesQuiz] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredQuizList, setFilteredQuizList] = useState([]);
    const { isLoggedIn, handleRefreshPage } = useAuth();

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
            if (!isLoggedIn) {
                handleRefreshPage();
            }
    }, [isLoggedIn,handleRefreshPage]);

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
            <UserAuthProfile/>
            <h1>👇Choose Your Quiz👇</h1>
            <CategorySelector
                categoriesList={categoriesList}
                handleCategorySelection={handleCategorySelection}
                handleResetCategorySelection={handleResetCategorySelection}
            />
            
            {/* Affichage des cartes de quiz */}
            <QuizList
                isLoggedIn={isLoggedIn}
                filteredQuizList={filteredQuizList}
            />
        </HomePage>
    );
};
