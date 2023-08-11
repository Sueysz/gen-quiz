import { ModalContainer, ModalContent } from "../components/Modal";
import PropTypes from 'prop-types'

const Modal = ({ children, onClose }) => {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <ModalContainer onClick={handleOverlayClick}>
            <ModalContent>
                {children}
            </ModalContent>
        </ModalContainer>
    );
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Modal;