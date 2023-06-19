import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [refreshPage , setRefreshPage] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, [refreshPage]);
    
    const handleRefreshPage = () =>{
        setRefreshPage(prevState => !prevState);
    }
    return (
        <AuthContext.Provider value={{ isLoggedIn, handleRefreshPage }}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);