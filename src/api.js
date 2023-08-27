const serverUrl = 'http://localhost:8800'

// Fonction pour gérer la connexion de l'utilisateur
export const login = async (email, password) => {
    const userData = {
        email: email,
        password: password,
    };

    try {
        const response = await fetch(serverUrl + "/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Request failed: ${errorMessage}`);
        }

        const { token } = await response.json();
        return token;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

// Fonction pour enregistrer un nouvel utilisateur
export const register = async (userName, email, password) => {
    const userData = {
        username: userName,
        email: email,
        password: password,
    };

    try {
        const response = await fetch(serverUrl + "/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Registration request failed: ${errorMessage}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

// Fonction pour obtenir les informations d'authentification d'un utilisateur
export const getAuth = async (email, password) => {
    const userData = {
        email: email,
        password: password,
    };

    try {
        const response = await fetch(serverUrl + "/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Login request failed: ${errorMessage}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

// Fonction pour obtenir la liste des quiz
export const listQuiz = async () => {
    try {
        const response = await fetch(serverUrl + "/quiz");
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to fetch quizzes: ${errorMessage}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error while fetching quizzes:', error);
        throw error;
    }
};

//fonction pour obtenir l'id du quiz avec le hook useparams
export const getQuiz = async (id) => {
    try {
        const response = await fetch(serverUrl + `/quiz/${id}`);
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to fetch quiz: ${errorMessage}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error while fetching quiz:', error);
        throw error;
    }
};

//fonction pour la déconnection
export const logout = async () => {
    try {
        const response = await fetch(serverUrl + "/logout", {
            method: "POST",
            credentials: "include",
        });
        const data = await response.json();
        return { ok: response.ok, data };
    } catch (error) {
        console.error('Error during logout:', error);
        throw error;
    }
};

//fonction pour crée un quiz
export const createQuiz = async (title, color, questions, category) => {
    const quizData = {
        title: title,
        color: color,
        questions: questions,
        category: category,
    };

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(serverUrl + "/createQuiz", {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(quizData)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Quiz creation failed: ${errorMessage}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error while creating quiz:', error);
        throw error;
    }
};

export const deleteQuiz = async (quizId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(serverUrl + `/deleteQuiz/${quizId}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Quiz deletion failed: ${errorMessage}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error while deleting quiz:', error);
        throw error;
    }
};

//fonction pour récuperer les information d'users
export const fetchUserinfo = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(serverUrl + '/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to fetch user details: ${errorMessage}`);
        }

        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Error while fetching user details:', error);
        throw error;
    }
};

//fonction pour récuperer la liste des catégories
export const fetchCategories = async () => {
    try {
        const response = await fetch(serverUrl + "/categories", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to fetch categories: ${errorMessage}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error while fetching categories:', error);
        throw error;
    }
};

//fonction qui récupère les quiz affilier à une categorie 
export const getQuizCategories = async () => {
    try {
        const response = await fetch(serverUrl + "/quiz_categories", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to fetch quiz categories: ${errorMessage}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error while fetching quiz categories:', error);
        throw error;
    }
};
