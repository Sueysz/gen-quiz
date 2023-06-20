import { login } from '../api'
import { Link, useNavigate } from 'react-router-dom'
import { LoginPage } from '../components/LoginPage'
import { ConfirmButton } from '../components/Buttons'
import { useCallback, useState } from 'react'
import { StyledIcon } from '../components/Icons'
import { useAuth } from '../utils/AuthProvider'

export const Login = () => {
    const { handleRefreshPage} = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

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
            const token =await login(formData.email, formData.password);
            setFormData({
                email: '',
                password: ''
            });

            localStorage.setItem('token',token);

            navigate('/');
            handleRefreshPage();
        } catch (error) {
            console.error(error);
            alert(error)
        }
    }, [formData, navigate]);

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
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <ConfirmButton type="submit">Login</ConfirmButton>
                    <span>
                        Don't have an account? <Link to="/register">Register</Link>
                    </span>
                </form>
            </LoginPage>
        </>
    );
};
