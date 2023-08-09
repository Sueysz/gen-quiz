export const isAuthenticated = () => {
    
    // Récupère le token depuis le stockage local
    const token = localStorage.getItem('token');
    return token !== null;
}