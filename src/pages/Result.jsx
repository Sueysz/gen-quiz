import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

//props score est incorrectAnswers vienne de Quiz ou les states sont gérer
export const Result = ({score, incorrectAnswers}) => {

    
    return (
        <div>
            Bravo! <button><Link to="/">back to Quiz</Link></button>
            <p>Score: {score}</p>
            <p>Incorrect Answers: {incorrectAnswers}</p>
        </div>
    )
}

Result.propTypes = {
    score: PropTypes.number.isRequired,
    incorrectAnswers: PropTypes.number.isRequired,
}