import { Link } from 'react-router-dom';
import styles from './Cart.module.css';

export const CartFooter = ({ isEmpty, onClose, buttonLabel }) => {
    if (isEmpty) {
        return null;
    }

    return (
        <Link to="/checkout" className={styles['cart__btn']} onClick={onClose}>
            <strong>{buttonLabel}</strong>
        </Link>
    );
};
