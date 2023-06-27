import Filter from 'bad-words'; 
import * as Yup from 'yup';
import { register } from '../api';
import { StyledIcon } from '../components/Icons';
import { ConfirmButton } from '../components/Buttons';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorMessage, RegisterPage } from '../components/RegisterPage';
import { isEmail, isEmpty, isLength } from 'validator';
import { useCallback, useEffect, useState } from 'react';

export const Register = () => {
    const navigate = useNavigate();
    const filter = new Filter();
    const [validationErrors, setValidationErrors] = useState({});
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
            await registerSchema.validate(formData, { abortEarly: false });

            if (isEmpty(username)) {
                throw new Error('Le nom d\'utilisateur est requis.');
            }

            if (!isEmail(email)) {
                throw new Error('Veuillez fournir une adresse e-mail valide.');
            }

            if (!isLength(password, { min: 8 })) {
                throw new Error('Le mot de passe doit comporter au moins 8 caractères.');
            }

            const isContentValid = filter.isProfane(username) || filter.isProfane(email);
            if (isContentValid) {
                throw new Error('The content you provided is inappropriate.')
            }

            await register(username, email, password);

            setFormData({
                username: '',
                email: '',
                password: '',
                registrationError: null
            });

            navigate('/login?register=true');
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = {};
                error.inner.forEach((err) => {
                    errors[err.path] = err.message;
                });
                setValidationErrors(errors);
            } else {
                console.error(error);

                setFormData((prevFormData) => ({
                    ...prevFormData,
                    registrationError: error.message
                }));
            }
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

    const registerSchema = Yup.object().shape({
        username: Yup.string().required('Username is required.'),
        email: Yup.string().email('Please provide a valid email address.').required('Email is required.'),
        password: Yup.string().min(8, 'Password must be at least 8 characters long.').required('Password is required.')
    });


    return (
        <>
            <RegisterPage>
                <Link to={'/'}>
                    <StyledIcon src='/icons/logo.png' alt='logo' />
                </Link>
                <h1>Join the Gen-Quiz community 🐻‍❄️</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={handleInputChange}
                    />
                    {validationErrors.username && <span>{validationErrors.username}</span>}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleInputChange}
                    />
                    {validationErrors.password && <span>{validationErrors.password}</span>}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleInputChange}
                    />
                    {validationErrors.email && <span>{validationErrors.email}</span>}
                    <ConfirmButton type="submit">
                        Register
                    </ConfirmButton>
                    {registrationError && <ErrorMessage>{registrationError}</ErrorMessage>}
                </form>
            </RegisterPage>
        </>
    );
};
