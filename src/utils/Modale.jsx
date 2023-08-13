import { ModaleContainer, ModaleContent } from "../components/Modale";
import PropTypes from 'prop-types'

const Modale = ({ children, onClose }) => {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <ModaleContainer onClick={handleOverlayClick}>
            <ModaleContent>
                {children}
            </ModaleContent>
        </ModaleContainer>
    );
};

Modale.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Modale;


