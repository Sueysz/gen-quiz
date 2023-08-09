import * as Yup from "yup"
import { login } from '../api'
import { useAuth } from '../utils/AuthProvider'
import { LoginPage } from '../components/LoginPage'
import { StyledIcon } from '../components/Icons'
import { ConfirmButton } from '../components/Buttons'
import { Link, useNavigate } from 'react-router-dom'
import { useCallback, useState } from 'react'

export const Login = () => {

    // Utilisation du hook useAuth pour gérer l'état de connexion de l'utilisateur
    const { handleRefreshPage} = useAuth();
    const [validationErrors, setValidationErrors]= useState({});

    // State pour stocker les données du formulaire (email et mot de passe)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    // Gestionnaire de changement de saisie dans le formulaire
    const handleInputChange = useCallback((event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }, []);

    // Gestionnaire de connexion
    const handleLogin = useCallback(async (event) => {
        event.preventDefault();

        try {
            // Validation des données du formulaire avec le schéma Yup (utilisation de abortEarly pour que yup valide tous les champs pour capturer toute les erreurs)
            await loginSchema.validate(formData, {abortEarly: false});

            // Appel à la fonction de connexion depuis l'API
            const token =await login(formData.email, formData.password);
            setFormData({
                email: '',
                password: ''
            });

            // Stockage du token dans le stockage local
            localStorage.setItem('token',token);

            navigate('/');
            handleRefreshPage();
            
            //gestion des erreurs
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

    // Schéma de validation Yup pour le formulaire de connexion
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
                        autoComplete="on"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {validationErrors.email && <span>{validationErrors.email}</span>}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="on"
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
