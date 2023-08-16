import PropTypes from 'prop-types'
import { Btn } from './style/Buttons'

export const CategorySelector = ({ categoriesList, handleCategorySelection, handleResetCategorySelection }) => {
    return (
        <div className='grid'>
            {/* Sélecteur de categories*/}
            <Btn style={{ width: '5rem', cursor: 'pointer' }} onClick={() => handleResetCategorySelection()}>
                all
            </Btn>
            {categoriesList.map((categorie) => (
                <Btn style={{ width: '5rem', cursor: 'pointer' }} onClick={() => handleCategorySelection(categorie.id)} key={categorie.id}>
                    {categorie.name}
                </Btn>
            ))}
        </div>
    )
}

CategorySelector.propTypes = {
    categoriesList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    handleCategorySelection: PropTypes.func.isRequired,
    handleResetCategorySelection: PropTypes.func.isRequired,
};