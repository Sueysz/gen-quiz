import { login } from '../api'
import { Link } from 'react-router-dom'
import { LoginPage } from '../components/LoginPage'
import { ConfirmButton } from '../components/Buttons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom/dist'

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            await login(email, password);
            navigate('/')
        } catch (error) {
            console.error(error);
        }
    }
    return <>
        <LoginPage >
            <h1>Welcome back 👻</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder='email'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <ConfirmButton type='submit'>Login</ConfirmButton>
                <span>Don't you have an account? <Link to="/register">Register</Link></span>
            </form>

        </LoginPage>
    </>
}
