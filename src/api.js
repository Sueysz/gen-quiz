export const login = async (email, password) => {
    const userData = {
        email: email,
        password: password,
    };

    try {
        const response = await fetch("http://localhost:8800/login", {
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

export const register = async (userName, email, password) => {
    const userData = {
        username: userName,
        email: email,
        password: password,
    };

    try {
        const response = await fetch("http://localhost:8800/register", {
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

export const getAuth = async (email, password) => {
    const userData = {
        email: email,
        password: password,
    };

    try {
        const response = await fetch("http://localhost:8800/login", {
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

export const listQuiz = async () => {
    try {
        const response = await fetch("http://localhost:8800/quiz");
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

export const getQuiz = async (id) => {
    try {
        const response = await fetch(`http://localhost:8800/quiz/${id}`);
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

export const logout = async () => {
    try {
        const response = await fetch("http://localhost:8800/logout", {
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

export const createQuiz = async (title, color, questions, category) => {
    const quizData = {
        title: title,
        color: color,
        questions: questions,
        category: category,
    };

    try {
        const response = await fetch("http://localhost:8800/createQuiz", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
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

export const fetchUserinfo = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8800/user', {
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

export const fetchCategories = async () => {
    try {
        const response = await fetch("http://localhost:8800/categories", {
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

export const getQuizCategories = async () => {
    try {
        const response = await fetch("http://localhost:8800/quiz_categories", {
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
