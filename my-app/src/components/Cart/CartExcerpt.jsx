import styles from './Cart.module.css';
import sprite from '@/assets/icons/sprite.svg';
import { useDispatch } from 'react-redux';
import { updateCartProduct, removeFromCart } from '@/redux/cartSlice';
import { useState } from 'react';
import CrossIcon from '@/assets/icons/CrossIcon';
import { getImagePath } from '@/utils/getImagePath';

export const CartExcerpt = ({ id, photo, name, price, count }) => {
    const dispatch = useDispatch();
    const [countFieldValue, setCountFieldValue] = useState(count);

    const handleCountChange = (newCount) => {
        setCountFieldValue(
            newCount <= 0 ? dispatch(removeFromCart(id)) : newCount
        );

        if (isNaN(newCount) || newCount <= 0) return;
        dispatch(updateCartProduct({ id, modifier: newCount - count }));
    };

    const handleBlur = () => {
        if (countFieldValue >= 1) return;

        setCountFieldValue(count);
    };

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(id));
    };

    return (
        <article className={styles['cart__item']}>
            <img
                src={getImagePath(photo?.path)}
                width="90"
                height="90"
                className={styles['cart__item-img']}
                alt={name}
            />
            <section className={styles['cart__item-container']}>
                <div className={styles['cart__item-header']}>
                    <h2 className={styles['cart__item-title']}>{name}</h2>
                    <button
                        className={styles['cart__btn--transparent']}
                        onClick={handleRemoveFromCart}
                    >
                        <CrossIcon color={'#1E2128'} width={16} height={16} />
                    </button>
                </div>
                <p className={styles['cart__item-description']}>Опис</p>
                <p className={styles['cart__item-vendor']}>Артикул: {id}</p>
                <section className={styles['cart__item-footer']}>
                    <div
                        className={
                            styles['counter'] + ' ' + styles['cart__counter']
                        }
                    >
                        <button
                            onClick={() => handleCountChange(count - 1)}
                            className={styles['counter__btn']}
                            disabled={count <= 1}
                        >
                            <svg width="9" height="9">
                                <use href={sprite + '#icon-minus'}></use>
                            </svg>
                        </button>
                        <input
                            type="number"
                            value={countFieldValue}
                            onChange={({ target: { value } }) =>
                                handleCountChange(Number(value))
                            }
                            onBlur={handleBlur}
                            className={styles['counter__input']}
                        />
                        <button
                            className={styles['counter__btn']}
                            onClick={() => handleCountChange(count + 1)}
                        >
                            <svg width="9" height="9">
                                <use href={sprite + '#icon-plus'}></use>
                            </svg>
                        </button>
                    </div>
                    <p className={styles['cart__item-price']}>
                        {price * count} ₴
                    </p>
                </section>
            </section>
        </article>
    );
};
