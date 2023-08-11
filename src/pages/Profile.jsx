import { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthProvider';
import { fetchUserinfo } from '../api';
import { ProfilePage } from '../components/ProfilePage';
import { Link } from 'react-router-dom';
import { StyledIcon } from '../components/Icons';
import { CardList } from '../components/Card';
import Modal from '../utils/Modal';

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

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await fetchUserinfo();
                setUser(userData.user);
                setQuiz(userData.quiz);
            } catch (error) {
                console.log('Error fetching user information:', error);
                if (error.response && error.response.status === 401 && error.response.data.message === "Token expired. User has been logged out.") {
                    setTokenExpired(true);
                    logout()
                }
            }
        };
        if (isLoggedIn) {
            fetchUser();
        }
    }, [isLoggedIn, logout]);

    // Gérer l'ouverture de la fenêtre modale
    const openModal = (quizItem) => {
        setSelectedQuiz(quizItem);
        setShowModal(true);
    };

    // Gérer la fermeture de la fenêtre modale
    const closeModal = () => {
        setSelectedQuiz(null);
        setShowModal(false);
    };

    return (
        <>
            <ProfilePage>
                <Link to={'/'}>
                    <StyledIcon src='/icons/logo.png' alt='logo' />
                </Link>
                {isLoggedIn ? (
                    <div>
                        {tokenExpired && <p style={{ color: 'red' }}>Votre session a expiré, veuillez vous reconnecter</p>}
                        <h1>Welcome, {user.username}! 🤹‍♀️</h1>
                        <div>
                            <h2>User Informations</h2>
                            <p>Email: {user.email}</p>

                        </div>
                        <div>
                            <h2>Tes QUIZ:</h2>
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
                                <h3>{selectedQuiz.title}</h3>
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
                            </Modal>
                        )}
                    </div>
                ) : (
                    <h1>Please log in to view your profile. 🤔</h1>
                )}
            </ProfilePage>
        </>
    );
};
