
export const login = (email,password)=>{
    console.log(email,password)
}
export const register = (userName,email,password)=>{
    console.log(userName,email,password)
}
export const getAuth = () =>{
    return {username:"stormy"}
}
export const listQuiz = ()=>{
    return fetch("http://localhost:8800/quiz").then((res)=>{
        return res.json()
    })
};
export const getQuiz = (slug)=>{
    // return data.find(quiz =>quiz.slug === slug )
    return fetch(`http://localhost:8800/quiz/${slug}`).then((res)=>{
        return res.json()
    })
}

