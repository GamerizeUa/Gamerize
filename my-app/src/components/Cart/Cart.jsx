import CrossIcon from '../icons/CrossIcon';
import styles from './Cart.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCart } from '../../redux/selectors';
import { CartExcerpt } from './CartExcerpt';

const Cart = ({ cartClose }) => {
    const { isEmpty, productList, total } = useSelector(selectCart);

    const handleOverlayClick = (event) => {
        if (event.currentTarget === event.target) {
            cartClose();
        }
    };

    return (
        <article className={styles.backdrop} onClick={handleOverlayClick}>
            <div className={styles.cart}>
                <header className={styles['cart__title-wrapper']}>
                    <h1 className={styles['cart__title']}>Кошик</h1>
                    <button
                        className={styles['cart__cross-btn']}
                        onClick={cartClose}
                    >
                        <CrossIcon />
                    </button>
                </header>
                <section className={styles['cart__box']}>
                    {isEmpty ? (
                        <p>Ви ще не додали жодної гри.</p>
                    ) : (
                        <ul className={styles['cart__list']}>
                            {productList.map((product) => (
                                <CartExcerpt {...product} key={product.id} />
                            ))}
                        </ul>
                    )}

                    <div className={styles['cart__total-price-wrapper']}>
                        <p className={styles['cart__total-price-text']}>
                            Сума:
                        </p>
                        <p className={styles['cart__total-price']}>{total} ₴</p>
                    </div>
                </section>
                <div className={styles['cart__btn-wrapper']}>
                    <Link to="/checkout" onClick={() => cartClose()}>
                        <button className={styles['cart__btn']}>
                            Замовити
                        </button>
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default Cart;
