
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
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error('Request failed');
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
        alert("error durring login")
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
            throw new Error('Registration request failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during registration:', error.message);
        alert("error during registration")
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
            throw new Error('Login request failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la connexion :', error.message);
        alert("error durring authentification")
    }
};

export const listQuiz = async () => {
    return await fetch("http://localhost:8800/quiz").then((res) => {
        return res.json()
    })
};
export const getQuiz = async (slug) => {
    // return data.find(quiz =>quiz.slug === slug )
    return await fetch(`http://localhost:8800/quiz/${slug}`).then((res) => {
        return res.json()
    })
};

