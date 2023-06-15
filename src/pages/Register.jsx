import { useCallback, useEffect, useState } from 'react';
import { ConfirmButton } from '../components/Buttons';
import { RegisterPage } from '../components/RegisterPage';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        registrationError: null
    });

    const { username, email, password, registrationError } = formData;

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();

        try {
            if (canSubmitForm) {
                await register(username, email, password);

                setUserName('');
                setEmail('');
                setPassword('');
                setRegistrationError(null);
                navigate('/login?register=true');
            }
        } catch (error) {
            console.error(error);
            setRegistrationError('Une erreur est survenue lors de l\'inscription.');
        }
    }, [canSubmitForm, username, email, password, navigate]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'username') {
            setUserName(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    useEffect(() => {
        setCanSubmitForm(username !== '' && email !== '' && password !== '');
    }, [username, email, password]);

    return (
        <>
            <RegisterPage>
                <h1>Join the Gen-Quiz community 🐻‍❄️</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleInputChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleInputChange}
                    />
                    <ConfirmButton type="submit" disabled={!canSubmitForm}>
                        Register
                    </ConfirmButton>
                </form>
                {registrationError === null && (
                    <p>Registration successful! Please proceed to login.</p>
                )}
                {registrationError && <p>{registrationError}</p>}
            </RegisterPage>
        </>
    );
};
