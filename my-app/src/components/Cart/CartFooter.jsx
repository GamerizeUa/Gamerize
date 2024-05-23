import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.css';

export const CartFooter = ({
    isEmpty,
    onClose,
    buttonLabel,
    buttonDisabled,
}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/checkout');
        onClose();
    };

    if (isEmpty) {
        return null;
    }

    return (
        <button
            className={styles['cart__btn']}
            onClick={handleClick}
            disabled={buttonDisabled}
        >
            <strong>{buttonLabel}</strong>
        </button>
    );
};
