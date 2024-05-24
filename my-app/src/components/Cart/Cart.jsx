import styles from './Cart.module.css';
import { useSelector } from 'react-redux';
import { selectCart } from '../../redux/selectors';
import { CartExcerpt } from './CartExcerpt';
import { CartHeader } from './CartHeader';
import { CartProductList } from './CartProductList';
import { CartFooter } from './CartFooter';
import { CartTotal } from './CartTotal';

const Cart = ({
    cartClose,
    headerTitle = 'Кошик',
    emptyMessage = 'Ваш кошик порожній.',
    totalLabel = 'Сума:',
    btnLabel = 'Замовити',
}) => {
    const { isEmpty, productList, total } = useSelector(selectCart);

    const handleOverlayClick = ({ currentTarget, target }) => {
        if (currentTarget === target) {
            cartClose();
        }
    };

    return (
        <div className={styles.backdrop} onClick={handleOverlayClick}>
            <article className={styles.cart}>
                <Cart.Header onClose={cartClose} title={headerTitle} />
                <section
                    className={
                        !isEmpty
                            ? styles['cart__container']
                            : styles['cart__container'] +
                              ' ' +
                              styles['cart__container--empty']
                    }
                >
                    <Cart.List isEmpty={isEmpty} emptyMessage={emptyMessage}>
                        {productList.map((product) => (
                            <Cart.ListItem {...product} key={product.id} />
                        ))}
                    </Cart.List>
                    <Cart.Total
                        isEmpty={isEmpty}
                        total={total}
                        totalLabel={totalLabel}
                    />
                </section>
                <Cart.Footer
                    isEmpty={isEmpty}
                    onClose={cartClose}
                    buttonLabel={btnLabel}
                    buttonDisabled={total === 0}
                />
            </article>
        </div>
    );
};

Cart.Header = CartHeader;
Cart.List = CartProductList;
Cart.Footer = CartFooter;
Cart.ListItem = CartExcerpt;
Cart.Total = CartTotal;

export default Cart;
