import styles from './Cart.module.css';

export const CartProductList = ({ isEmpty, children, emptyMessage }) => {
    if (isEmpty) {
        return <p>{emptyMessage}</p>;
    }
    return <ul className={styles['cart__list']}>{children}</ul>;
};
