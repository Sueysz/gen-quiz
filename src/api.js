
export const login = (email, password) => {
    console.log(email, password)
}
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
            throw new Error('Request failed');
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};


export const getAuth = () => {
    return { username: "stormy" }
}
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
}

