import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '@/redux/selectors.js';
import { OrderCartItem } from './OrderCartItem.jsx';
import { OrderCartInputs } from './OrderCartInputs.jsx';
import sprite from '@/assets/icons/sprite.svg';
import styles from './OrderCart.module.css';
import { useEffect, useState } from 'react';
import {setDiscountInfo, setField, setProductItem} from '@/redux/newOrderSlice.js';
import {useLocation} from "react-router-dom";

export const OrderCart = () => {
    const { isEmpty, productList, total } = useSelector(selectCart);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [oneProductQuantity, setOneProductQuantity] = useState(1);
    const [oneProductTotalPrice, setOneProductTotalPrice] = useState(0);
    const { discountValue, discountId } = useSelector(
        (state) => state.discount
    );
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        setDiscountAmount(
            location.state
                ? parseFloat((oneProductTotalPrice * (discountValue / 100)).toFixed(1))
                : parseFloat((total * (discountValue / 100)).toFixed(1))
        );
        if (discountAmount > 0) {
            dispatch(setDiscountInfo({ discountAmount, discountId }));
        }
    }, [discountValue, total, discountAmount, oneProductTotalPrice]);

    useEffect(() => {
        if(location.state){
            setOneProductTotalPrice( location.state.productPrice * oneProductQuantity);
            dispatch(
                setProductItem({
                    id: location.state.productScu,
                    count: oneProductQuantity,
                })
            );
        }
    }, [oneProductQuantity]);

    useEffect(() => {
        if(location.state){
            dispatch(setField({ field: 'totalPrice', value: oneProductTotalPrice }));
        }
    }, [oneProductTotalPrice]);

    return (
        <div className={styles.orderCartContainer}>
            <div className={styles.orderCart}>
                <p className={styles.cartTitle}>Ваше замовлення</p>
                {isEmpty && !location.state ? (
                    <p className={styles.emptyCartText}>Ваш кошик порожній</p>
                ) : (
                    <ul className={styles.cartList}>
                        {location.state ? (
                            <OrderCartItem
                                id={location.state.productScu}
                                name={location.state.productName}
                                price={location.state.productPrice}
                                images={location.state.productImage}
                                count={oneProductQuantity}
                                setOneProductQuantity={setOneProductQuantity}
                            />
                        ): (
                            productList.map((product) => (
                                    <OrderCartItem key={product.id} {...product} />
                                ))
                        )}
                    </ul>
                )}
                <OrderCartInputs />
                <div className={styles.priceContainer}>
                    <div className={styles.priceElement}>
                        <p>Сума:</p>
                        <div className={styles.inner}>
                            {location.state ? (
                                <p>{oneProductTotalPrice}</p>
                            ) : (
                                <p>{total}</p>
                            )}
                            <span>₴</span>
                        </div>
                    </div>
                    {discountValue !== 0 && (
                        <div className={styles.priceElement}>
                            <p>Знижка {discountValue}%:</p>
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
                        <p>{location.state
                            ? oneProductTotalPrice - discountAmount
                            : total - discountAmount}</p>
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
