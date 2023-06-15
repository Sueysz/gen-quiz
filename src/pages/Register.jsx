import { useCallback, useEffect, useState } from 'react';
import { ConfirmButton } from '../components/Buttons';
import { ErrorMessage, RegisterPage } from '../components/RegisterPage';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';
import { isEmail, isEmpty, isLength } from 'validator';

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
            if (formData.canSubmitForm) {
                if (isEmpty(username)) {
                    throw new Error('Le nom d\'utilisateur est requis.');
                }

                if (!isEmail(email)) {
                    throw new Error('Veuillez fournir une adresse e-mail valide.');
                }

                if (!isLength(password, { min: 8 })) {
                    throw new Error('Le mot de passe doit comporter au moins 8 caractères.');
                }

                await register(username, email, password);

                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    registrationError: null
                });

                navigate('/login?register=true');
            }
        } catch (error) {
            console.error(error);
            setFormData((prevFormData) => ({
                ...prevFormData,
                registrationError: error.message
            }));
        }
    }, [formData, navigate, email, username, password]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    useEffect(() => {
        const canSubmitForm = !isEmpty(username) && isEmail(email) && isLength(password, { min: 8 });
        setFormData((prevFormData) => ({
            ...prevFormData,
            canSubmitForm
        }));
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
                    <ConfirmButton type="submit" disabled={!formData.canSubmitForm}>
                        Register
                    </ConfirmButton>
                    {registrationError && <ErrorMessage>{registrationError}</ErrorMessage>}
                </form>
            </RegisterPage>
        </>
    );
};
