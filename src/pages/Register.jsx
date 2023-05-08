import './Register.css'

export const Register = () => {
    return <>
        <div id="register">
            <h1>Join the Gen-Quiz <br/> community 🐻‍❄️</h1>
            <form>
                <input type="text" placeholder='Username' />
                <input type="password" placeholder='Password' />
                <input type="email" placeholder='Email' />
                <button>Register</button>
            </form>

        </div>
    </>
}
