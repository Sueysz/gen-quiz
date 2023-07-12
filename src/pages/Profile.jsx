import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthProvider';
import { FetchUserInfo } from '../api';
import { ProfilePage } from '../components/ProfilePage';
import { Link } from 'react-router-dom';
import { StyledIcon } from '../components/Icons';

export const Profile = () => {
    const { isLoggedIn } = useAuth();
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await FetchUserInfo();
                setUser(userData)
            } catch (error) {
                console.log('Error fetching user information:', error);
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
                    user ? (
                        <div>
                            <h1>Welcome, {user.username}! 🤹‍♀️</h1>
                            <p>Email: {user.email}</p>
                        </div>
                    ) : (
                        <p>Loading User data...</p>
                    )
                ) : (
                    <h1>Please log in to view your profile. 🤔</h1>
                )}
            </ProfilePage>
        </>
    );
};
