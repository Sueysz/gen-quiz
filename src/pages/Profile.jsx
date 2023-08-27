import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthProvider';
import { deleteQuiz, fetchUserinfo } from '../api';
import { ProfilImg, ProfilInfo, ProfilePage } from '../components/style/ProfilePage';
import { CardList } from '../components/style/Card';
import Modale from '../utils/Modale';
import {CloseButton, DeleteContainer } from '../components/style/Modale';
import { Btn } from '../components/style/Buttons';
import { Logo } from '../components/Logo';

export const Profile = () => {
    const { isLoggedIn, logout } = useAuth();
    const [user, setUser] = useState({
        id: 0,
        username: '',
        email: '',
        profilPicture: null
    });
    const [quiz, setQuiz] = useState([]);
    const [tokenExpired, setTokenExpired] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [showModale, setShowModale] = useState(false);
    const [showDeleteConfirmationModale, setShowDeleteConfirmationModale] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            try {
                const fetchUserData = async ()=>{
                    const userData = await fetchUserinfo();
                    setUser(userData.user);
                    setQuiz(userData.quiz);
                }
                fetchUserData()
            } catch (error) {
                console.log('Error fetching user information:', error);
                if (error.response && error.response.status === 401 && error.response.data.message === "Token expirée. l'utilisateur à était déconnecter.") {
                    setTokenExpired(true);
                    logout();
                }
            }
        }
    }, [isLoggedIn, logout]);

    const deleteQuizHandler = useCallback(async () => {
        if (selectedQuiz) {
            try {
                await deleteQuiz(selectedQuiz.id);
                setQuiz(prevQuiz => prevQuiz.filter(quizItem => quizItem.id !== selectedQuiz.id));
                closeModale();
            } catch (error) {
                console.error('Error deleting quiz:', error);
            }
        }
    }, [selectedQuiz]);

    const openModale = (quizItem) => {
        setSelectedQuiz(quizItem);
        setShowModale(true);
    };

    const openDeleteConfirmationModale = () => {
        setShowDeleteConfirmationModale(true);
    };

    const closeModale = () => {
        setSelectedQuiz(null);
        setShowModale(false);
        setShowDeleteConfirmationModale(false);
    };

    const handleProfilPictureChange = (event) =>{
        const file = event.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onload = () => {
                setUser(prevUser => ({...prevUser, profilPicture: reader.result}));
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <ProfilePage>
            <Logo/>
            {isLoggedIn ? (
                <div>
                    {tokenExpired && <p style={{ color: 'red' }}>Ta session est expirée, reconnecte toi s&apos;il te plais </p>}
                    <h1>Hello, {user.username}! 🤹‍♀️</h1>
                        <h1>User Informations</h1>
                    <ProfilInfo>
                        <label htmlFor="profile-photo">Choisi ta photo:</label>
                        <input type='file' accept='image/jpeg, image/png' onChange={handleProfilPictureChange} />
                        {user.profilPicture && <ProfilImg src={user.profilPicture} alt='Profil' />}
                        <p>Email: {user.email}</p>
                    </ProfilInfo>
                    <div>
                        <h1>Ton QUIZ:</h1>
                        <div className='grid'>
                            {quiz.map((quizItem) => (
                                <CardList style={{ backgroundColor: quizItem.color }} key={quizItem.id} onClick={() => openModale(quizItem)}>
                                    <p>{quizItem.title}</p>
                                </CardList>
                            ))}
                        </div>
                    </div>
                    {showModale && selectedQuiz && (
                        <Modale onClose={closeModale}>
                            <CloseButton onClick={closeModale}>X</CloseButton>
                            <h1>{selectedQuiz.title}</h1>
                            <div>
                                {selectedQuiz.questions.map((qa, index) => (
                                    <div key={index}>
                                        <h4>Question {index + 1}:</h4>
                                        <p>{qa.question}</p>
                                        <h4>réponses:</h4>
                                        {qa.answers.map((answer, answerIndex) => (
                                            <p key={answerIndex}>{answer}</p>
                                        ))}
                                        <h4>Solution:</h4>
                                        <p>{qa.answers[qa.solution]}</p>
                                    </div>
                                ))}
                            </div>
                            <DeleteContainer>
                                <Btn onClick={openDeleteConfirmationModale}>Supprime ce quiz</Btn>
                            </DeleteContainer>
                        </Modale>
                    )}
                    {showDeleteConfirmationModale && (
                        <Modale>
                            <h1>Tu es sûr de vouloir supprimer ce quiz ?</h1>
                            <button onClick={deleteQuizHandler}>Oui</button>
                            <button onClick={closeModale}>Annuler</button>
                        </Modale>
                    )}
                </div>
            ) : (
                <h1>Connecte toi pour voir ton profile. 🤔</h1>
            )}
        </ProfilePage>
    );
};

