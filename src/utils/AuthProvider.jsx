import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types"

// Crée un contexte pour l'authentification
const AuthContext = createContext();

// Crée un fournisseur d'authentification qui encapsule l'état d'authentification
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [refreshPage , setRefreshPage] = useState(false);
    
    // Crée une valeur de contexte en utilisant useMemo pour éviter les re-créations inutiles
    const providerValue = useMemo(() => ({
        isLoggedIn,

        // Fonction pour rafraîchir la page en changeant le state refreshPage
        handleRefreshPage: () => setRefreshPage(prevState => !prevState)
    }), [isLoggedIn, setRefreshPage]);

    // Effet pour vérifier l'état d'authentification au chargement de la page
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, [refreshPage]);

    // Rend le contexte avec la valeur fournie
    return (
        <AuthContext.Provider value={providerValue}>
            { children }
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Crée un hook personnalisé pour accéder au contexte d'authentification
export const useAuth = () => useContext(AuthContext);

