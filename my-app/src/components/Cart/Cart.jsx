import { useDispatch, useSelector } from 'react-redux';
import { handleOverlayClick } from '@/utils/handlers';
import { selectCart } from '@/redux/selectors';
import { CartHeader } from './CartHeader';
import { CartProductList } from './CartProductList';
import { CartExcerpt } from './CartExcerpt';
import { CartTotal } from './CartTotal';
import { CartFooter } from './CartFooter';
import styles from './Cart.module.css';
import useNoScroll from '@/hooks/useNoScroll.js';
import { assignIsDisplayedCart } from '@/redux/formsDisplaying.js';

const Cart = ({
    headerTitle = 'Кошик',
    emptyMessage = 'Ваш кошик порожній',
    totalLabel = 'Сума:',
    btnLabel = 'Замовити',
}) => {
    const { isEmpty, productList, total } = useSelector(selectCart);
    useNoScroll(true);
    const dispatch = useDispatch();

    const cartClose = () => {
        dispatch(assignIsDisplayedCart(false));
    };

    return (
        <div
            className={styles.backdrop}
            onClick={(e) => handleOverlayClick(e, cartClose)}
        >
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
