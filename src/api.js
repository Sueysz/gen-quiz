
export const login = async (email, password) => {
    const userData = {
        email: email,
        password: password,
    };

    const response = await fetch("http://localhost:8800/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error('Request failed');
    }

    const { token } = await response.json();
    return token;
};

export const register = async (userName, email, password) => {
    const userData = {
        username: userName,
        email: email,
        password: password,
    };

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

};

export const getAuth = async (email, password) => {
    const userData = {
        email: email,
        password: password,
    };

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

};

export const listQuiz = async () => {
    return await fetch("http://localhost:8800/quiz").then((res) => {
        return res.json()
    })
};
export const getQuiz = async (id) => {
    // return data.find(quiz =>quiz.slug === slug )
    return await fetch(`http://localhost:8800/quiz/${id}`).then((res) => {
        return res.json()
    })
};

export const logout = async () => {
    const response = await fetch("http://localhost:8800/logout", {
        method: "POST",
        credentials: "include",
    });
    const data = await response.json();
    return { ok: response.ok, data };
};

export const createQuiz = async (title, color, questions) => {
    const quizData = {
        title: title,
        color: color,
        questions: questions,
    };

    const response = await fetch("http://localhost:8800/createQuiz", {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(quizData)
    });

    if (!response.ok) {
        throw new Error('Registration request failed');
    }
    return await response.json();;
}

export const FetchUserInfo = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8800/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            
        });
        console.log(response)
        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }

        const userData = await response.json();
        console.log(userData)
        return userData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const FetchCategories = async () =>{
    const response = await fetch("http://localhost:8800/categories", {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('fetch categories request failed');
    }
    return response.json()
}