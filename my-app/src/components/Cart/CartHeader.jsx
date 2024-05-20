import styles from './Cart.module.css';
import CrossIcon from '../icons/CrossIcon';

export const CartHeader = ({ title, onClose }) => {
    return (
        <header className={styles['cart__header']}>
            <h1 className={styles['cart__title']}>{title}</h1>
            <button
                className={styles['cart__btn--transparent']}
                onClick={onClose}
            >
                <CrossIcon />
            </button>
        </header>
    );
};
