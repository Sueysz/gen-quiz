import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types"
import jwtDecode from "jwt-decode";

// Crée un contexte pour l'authentification
const AuthContext = createContext();

// Crée un fournisseur d'authentification qui encapsule l'état d'authentification
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [refreshPage, setRefreshPage] = useState(false);
    // Vérifie si le token a expiré avant de rendre le composant
    const hasTokenExpired = () => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem("token");
                setIsLoggedIn(false); // Déconnectez l'utilisateur si le token est expiré
            }
        }
    };

    useEffect(() => {
        hasTokenExpired();

        // Vérifie l'expiration du token toutes les x millisecondes (par exemple toutes les 10 secondes)
        const interval = setInterval(() => {
            hasTokenExpired();
        }, 3 * 60 * 60 * 1000); //3*60/minute 60/seconde et 10000 ms = 10 secondes

        return () => {
            clearInterval(interval); // Nettoie l'intervalle lorsque le composant est démonté
        };
    }, []);
    // Crée une valeur de contexte en utilisant useMemo pour éviter les re-créations inutiles
    const providerValue = useMemo(() => ({
        isLoggedIn,

        // Fonction pour rafraîchir la page en changeant le state refreshPage
        handleRefreshPage: () => setRefreshPage(prevState => !prevState),
        logout: () => {
            localStorage.removeItem('token'); // Supprime le token du stockage local
            setIsLoggedIn(false); // Met à jour l'état d'authentification
        }
    }), [isLoggedIn, setRefreshPage]);

    // Effet pour vérifier l'état d'authentification au chargement de la page
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, [refreshPage]);
    return (
        <AuthContext.Provider value={providerValue}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
// Crée un hook personnalisé pour accéder au contexte d'authentification
export const useAuth = () => useContext(AuthContext);






