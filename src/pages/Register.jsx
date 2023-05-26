import { ConfirmButton } from '../components/Buttons'
import { RegisterPage } from '../components/RegisterPage'

export const Register = () => {
    return <>
        <RegisterPage>
            <h1>Join the Gen-Quiz <br/> community 🐻‍❄️</h1>
            <form>
                <input type="text" placeholder='Username' />
                <input type="password" placeholder='Password' />
                <input type="email" placeholder='Email' />
                <ConfirmButton type='submit'>Register</ConfirmButton>
            </form>

        </RegisterPage>
    </>
}

