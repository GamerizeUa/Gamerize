import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '@/redux/selectors';
import { OrderCartItem } from './OrderCartItem';
import { OrderCartInputs } from './OrderCartInputs';
import sprite from '@/assets/icons/sprite.svg';
import styles from './OrderCart.module.css';
import { useEffect, useState } from 'react';
import { setDiscountInfo } from '@/redux/newOrderSlice.js';

export const OrderCart = () => {
    const { isEmpty, productList, total } = useSelector(selectCart);
    const { discountValue, discountId } = useSelector(
        (state) => state.discount
    );
    const [discountAmount, setDiscountAmount] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        setDiscountAmount(
            parseFloat((total * (discountValue / 100)).toFixed(1))
        );
        if (discountAmount > 0) {
            dispatch(setDiscountInfo({ discountAmount, discountId }));
        }
    }, [discountValue, total, discountAmount]);

    return (
        <div className={styles.orderCartContainer}>
            <div className={styles.orderCart}>
                <p className={styles.cartTitle}>Ваше замовлення</p>
                {isEmpty ? (
                    <p className={styles.emptyCartText}>Ваш кошик порожній</p>
                ) : (
                    <ul className={styles.cartList}>
                        {productList.map((product) => (
                            <OrderCartItem key={product.id} {...product} />
                        ))}
                    </ul>
                )}
                <OrderCartInputs />
                <div className={styles.priceContainer}>
                    <div className={styles.priceElement}>
                        <p>Сума:</p>
                        <div className={styles.inner}>
                            <p>{total}</p>
                            <span>₴</span>
                        </div>
                    </div>
                    {discountValue !== 0 && (
                        <div className={styles.priceElement}>
                            <p>Промокод:</p>
                            <div className={styles.inner}>
                                <p>-{discountAmount}</p>
                                <span>₴</span>
                            </div>
                        </div>
                    )}
                    <div className={styles.priceElement}>
                        <p>Доставка:</p>
                        <p>Безкоштовно</p>
                    </div>
                </div>
                <div className={styles.totalPriceContainer}>
                    <p>Загалом:</p>
                    <div className={styles.inner}>
                        <p>{total - discountAmount}</p>
                        <span>₴</span>
                    </div>
                </div>
            </div>
            <div className={styles.safeMark}>
                <svg width={16} height={16}>
                    <use href={sprite + '#icon-safe_lock'} />
                </svg>
                <p>Безпечна оплата</p>
            </div>
        </div>
    );
};
