import styles from './Cart.module.css';

export const CartTotal = ({ isEmpty, total, totalLabel }) => {
    if (isEmpty) {
        return null;
    }
    return (
        <div className={styles['cart__total']}>
            <p className={styles['cart__price-label']}>{totalLabel}</p>
            <p className={styles['cart__price']}>{total} ₴</p>
        </div>
    );
};
