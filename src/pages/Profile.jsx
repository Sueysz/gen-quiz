import React from 'react';
import { useAuth } from '../utils/AuthProvider';

export const Profile = () => {
    const { user } = useAuth();
    console.log(user)

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Hey {user.username}!</h1>
            <p>Email: {user.email}</p>
        </div>
    );
};