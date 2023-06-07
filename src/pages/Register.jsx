import { useState } from 'react'
import { ConfirmButton } from '../components/Buttons'
import { RegisterPage } from '../components/RegisterPage'
import { register } from '../api';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await register(username, email, password);
        } catch (error) {
            console.error(error);
        }
    };

    return <>
        <RegisterPage>
            <h1>Join the Gen-Quiz <br /> community 🐻‍❄️</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Username'
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <input
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <input
                    type="email"
                    placeholder='Email'
                    value={email}
                    onChange={(event)=> setEmail(event.target.value)}
                />
                <ConfirmButton type='submit'>Register</ConfirmButton>
            </form>

        </RegisterPage>
    </>
}

