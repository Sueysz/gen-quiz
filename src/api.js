const data = [
    {id: 0,slug:'premier',title: 'Premier Quiz',color:'rgba(104, 219, 255, 1)'},
    {id: 1,slug:'deuxieme',title: 'Deuxième Quiz',color:'rgba(185, 117, 239, 1)'},
    {id: 2,slug:'troisieme',title: 'Troisième Quiz',color:'rgba(252, 129, 77, 1)'},
    {id: 3,slug:'quatrieme',title: 'Quatrième Quiz',color:'rgba(255, 213, 64, 1)'},
    {id: 4,slug:'cinquieme',title: 'Cinquième Quiz',color:'rgba(255, 88, 238, 1)'},
    {id: 5,slug:'sixieme',title: 'Sixième Quiz',color:'rgba(42, 237, 120, 1)'},
]

export const listQuiz = ()=>{
    return data;
};

export const getQuiz = (slug)=>{
    return data.find(quiz =>quiz.slug === slug )
}

