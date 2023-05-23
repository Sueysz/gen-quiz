import { login } from '../api'
import { Link } from 'react-router-dom'
import { LoginPage } from '../components/LoginPage'
import { ConfirmButton } from '../components/Buttons'

export const Login = () => {
    const handleLogin = ()=>{
        login("sun",123)
    }
    return <>
        <LoginPage >
            <h1>Welcome back 👻</h1>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder='Username' />
                <input type="password" placeholder='Password' />
                <ConfirmButton type='submit'>Login</ConfirmButton>
                <span>Don't you have an account? <Link to="/register">Register</Link></span>
            </form>
            
        </LoginPage>
    </>
}
