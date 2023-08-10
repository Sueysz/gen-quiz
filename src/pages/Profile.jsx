import { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthProvider';
import { fetchUserinfo } from '../api';
import { ProfilePage } from '../components/ProfilePage';
import { Link } from 'react-router-dom';
import { StyledIcon } from '../components/Icons';

export const Profile = () => {
    const { isLoggedIn } = useAuth();
    const [user, setUser] = useState({
        id: 0,
        username: '',
        email: ''
    });
    const [quiz, setQuiz] = useState([]);
    const [tokenExpired, setTokenExpired] = useState(false);

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
                }
            }
        };
        if (isLoggedIn) {
            fetchUser();
        }
    }, [isLoggedIn]);

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
                        <p>Email: {user.email}</p>
                        <div>
                            <h2>User Object:</h2>
                            <pre>{JSON.stringify(user, null, 2)}</pre>
                        </div>
                        <div>
                            <h2>Quiz Array:</h2>
                            <pre>{JSON.stringify(quiz, null, 2)}</pre>
                        </div>
                    </div>
                ) : (
                    <h1>Please log in to view your profile. 🤔</h1>
                )}
            </ProfilePage>
        </>
    );
};
