import Filter from "bad-words"
import * as Yup from "yup"
import { login } from '../api'
import { useAuth } from '../utils/AuthProvider'
import { LoginPage } from '../components/LoginPage'
import { StyledIcon } from '../components/Icons'
import { ConfirmButton } from '../components/Buttons'
import { Link, useNavigate } from 'react-router-dom'
import { useCallback, useState } from 'react'

export const Login = () => {
    const { handleRefreshPage} = useAuth();
    const [validationErrors, setValidationErrors]= useState({});
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const filter = new Filter();
    const navigate = useNavigate();

    const handleInputChange = useCallback((event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }, []);

    const handleLogin = useCallback(async (event) => {
        event.preventDefault();

        try {
            await loginSchema.validate(formData, {abortEarly: false});

            if (filter.isProfane(formData.email) || filter.isProfane(formData.password)){
                throw new Error('Please use appropriate language in your credentials.')
            }

            const token =await login(formData.email, formData.password);
            setFormData({
                email: '',
                password: ''
            });

            localStorage.setItem('token',token);

            navigate('/');
            handleRefreshPage();
        } catch (error) {
            if (error instanceof Yup.ValidationError){
                const errors = {};
                error.inner.forEach((err)=>{
                    errors[err.path] = err.message;
                });
                setValidationErrors(errors);
            }else{
                console.error(error);
                alert(error)
            }
        }
    }, [formData, navigate]);

    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    return (
        <>
            <LoginPage>
                <Link to={'/'}>
                    <StyledIcon src='/icons/logo.png' alt='logo' />
                </Link>
                <h1>Welcome back 👻</h1>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {validationErrors.email && <span>{validationErrors.email}</span>}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    {validationErrors.password && <span>{validationErrors.password}</span>}
                    <ConfirmButton type="submit">Login</ConfirmButton>
                    <span>
                        Don't have an account? <Link to="/register">Register</Link>
                    </span>
                </form>
            </LoginPage>
        </>
    );
};
