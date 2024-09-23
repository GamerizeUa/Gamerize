import styles from './Cart.module.css';
import emptyCart from '@/assets/images/empty_cart.png';

export const CartProductList = ({ isEmpty, children, emptyMessage }) => {
    if (isEmpty) {
        return (
            <div className={styles['cart__message']}>
                <img
                    src={emptyCart}
                    alt=""
                    className={
                        styles['cart__icon'] + ' ' + styles['cart__icon--empty']
                    }
                />
                <p>{emptyMessage}</p>
            </div>
        );
    }
    return <ul className={styles['cart__list']}>{children}</ul>;
};
