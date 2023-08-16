import { Card, CardAdd } from "./style/Card"
import PropTypes from 'prop-types'

export const QuizList = ({isLoggedIn,filteredQuizList}) => {
    return (
        <div className='grid'>
            {/* Bouton pour ajouter un nouveau quiz, affiché si l'utilisateur est connecté */}
            {isLoggedIn ? <CardAdd style={{ backgroundColor: 'black' }} to='/FormQuiz' /> : null}
            {filteredQuizList.map((quiz) => (
                <Card to={`quiz/${quiz.id}`} style={{ backgroundColor: quiz.color }} key={quiz.id}>
                    <p>{quiz.title}</p>
                </Card>
            ))}
        </div>
    )
}

QuizList.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    filteredQuizList: PropTypes.array.isRequired,
}