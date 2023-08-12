import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthProvider';
import { deleteQuiz, fetchUserinfo } from '../api';
import { ProfilePage } from '../components/ProfilePage';
import { Link } from 'react-router-dom';
import { StyledIcon } from '../components/Icons';
import { CardList } from '../components/Card';
import Modal from '../utils/Modal';
import { CloseButton } from '../components/Modal';

export const Profile = () => {
    const { isLoggedIn, logout } = useAuth();
    const [user, setUser] = useState({
        id: 0,
        username: '',
        email: ''
    });
    const [quiz, setQuiz] = useState([]);
    const [tokenExpired, setTokenExpired] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);

    const fetchUserData = async () => {
        try {
            const userData = await fetchUserinfo();
            setUser(userData.user);
            setQuiz(userData.quiz);
        } catch (error) {
            console.log('Error fetching user information:', error);
            if (error.response && error.response.status === 401 && error.response.data.message === "Token expired. User has been logged out.") {
                setTokenExpired(true);
                logout();
            }
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchUserData();
        }
    }, [isLoggedIn, logout]);

    const deleteQuizHandler = useCallback(async () => {
        if (selectedQuiz) {
            try {
                await deleteQuiz(selectedQuiz.id);
                setQuiz(prevQuiz => prevQuiz.filter(quizItem => quizItem.id !== selectedQuiz.id));
                closeModal();
            } catch (error) {
                console.error('Error deleting quiz:', error);
            }
        }
    }, [selectedQuiz]);

    const openModal = (quizItem) => {
        setSelectedQuiz(quizItem);
        setShowModal(true);
    };

    const openDeleteConfirmationModal = () => {
        setShowDeleteConfirmationModal(true);
    };

    const closeModal = () => {
        setSelectedQuiz(null);
        setShowModal(false);
        setShowDeleteConfirmationModal(false);
    };

    return (
        <ProfilePage>
            <Link to={'/'}>
                <StyledIcon src='/icons/logo.png' alt='logo' />
            </Link>
            {isLoggedIn ? (
                <div>
                    {tokenExpired && <p style={{ color: 'red' }}>Your session expired, please log in again</p>}
                    <h1>Welcome, {user.username}! 🤹‍♀️</h1>
                    <div>
                        <h1>User Informations</h1>
                        <p>Email: {user.email}</p>
                    </div>
                    <div>
                        <h1>Your QUIZ:</h1>
                        <div className='grid'>
                            {quiz.map((quizItem) => (
                                <CardList style={{ backgroundColor: quizItem.color }} key={quizItem.id} onClick={() => openModal(quizItem)}>
                                    <p>{quizItem.title}</p>
                                </CardList>
                            ))}
                        </div>
                    </div>
                    {showModal && selectedQuiz && (
                        <Modal onClose={closeModal}>
                            <CloseButton onClick={closeModal}>X</CloseButton>
                            <h1>{selectedQuiz.title}</h1>
                            <div>
                                {selectedQuiz.questions.map((qa, index) => (
                                    <div key={index}>
                                        <h4>Question {index + 1}:</h4>
                                        <p>{qa.question}</p>
                                        <h4>Answers:</h4>
                                        {qa.answers.map((answer, answerIndex) => (
                                            <p key={answerIndex}>{answer}</p>
                                        ))}
                                        <h4>Solution:</h4>
                                        <p>{qa.answers[qa.solution]}</p>
                                    </div>
                                ))}
                            </div>
                            <button onClick={openDeleteConfirmationModal}>Delete this quiz</button>
                        </Modal>
                    )}
                    {showDeleteConfirmationModal && (
                        <Modal>
                            <h1>Are you sure, you gonna delete this quiz ?</h1>
                            <button onClick={deleteQuizHandler}>Oui</button>
                            <button onClick={closeModal}>Annuler</button>
                        </Modal>
                    )}
                </div>
            ) : (
                <h1>Please log in to view your profile. 🤔</h1>
            )}
        </ProfilePage>
    );
};

