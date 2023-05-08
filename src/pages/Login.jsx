import { login } from '../api'
import './Login.css'
import { Link } from 'react-router-dom'

export const Login = () => {
    const handleLogin = ()=>{
        login("sun",123)
    }
    return <>
        <div id="login">
            <h1>Welcome back 👻</h1>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder='Username' />
                <input type="password" placeholder='Password' />
                <button type='submit'>Login</button>
                <span>Don't you have an account? <Link to="/register">Register</Link></span>
            </form>
            
        </div>
    </>
}
