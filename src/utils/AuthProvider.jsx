import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [refreshPage , setRefreshPage] = useState(false);
    
    const providerValue = useMemo(() => ({
        isLoggedIn,
        handleRefreshPage: () => setRefreshPage(prevState => !prevState)
    }), [isLoggedIn, setRefreshPage]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, [refreshPage]);
    return (
        <AuthContext.Provider value={providerValue}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);