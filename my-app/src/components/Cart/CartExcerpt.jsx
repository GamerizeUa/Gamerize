import styles from './Cart.module.css';
import sprite from '../../assets/icons/sprite.svg';
import { useDispatch } from 'react-redux';
import { updateCartProduct } from '../../redux/cartSlice';
import { useState } from 'react';

export const CartExcerpt = ({ id, photo, name, price, count }) => {
    const dispatch = useDispatch();
    const [countFieldValue, setCountFieldValue] = useState(count);

    const handleCountChange = (newCount) => {
        setCountFieldValue(newCount);
        dispatch(updateCartProduct({ id, modifier: newCount - count }));
    };

    return (
        <article className={styles['cart__list-item']}>
            <img
                src={photo}
                width="90"
                height="90"
                className={styles['cart__item-img']}
                alt={name}
            />
            <section className={styles['cart__item-description']}>
                <p className={styles['cart__product-title']}>{name}</p>
                <p className={styles['cart__product-description']}>Опис</p>
                <p className={styles['cart__product-article']}>
                    Артикул: 123456
                </p>
                <div className={styles['cart__counter-wrapper']}>
                    <div className={styles['cart__product-counter']}>
                        <button
                            onClick={() => handleCountChange(count - 1)}
                            className={styles['cart__input-btn']}
                        >
                            <svg width="9" height="9">
                                <use href={sprite + '#icon-minus'}></use>
                            </svg>
                        </button>
                        <input
                            type="number"
                            step={1}
                            min={1}
                            value={countFieldValue}
                            onChange={({ target: { value } }) =>
                                handleCountChange(Number(value))
                            }
                            className={styles['cart__input']}
                        />
                        <button
                            className={styles['cart__input-btn']}
                            onClick={() => handleCountChange(count + 1)}
                        >
                            <svg width="9" height="9">
                                <use href={sprite + '#icon-plus'}></use>
                            </svg>
                        </button>
                    </div>
                    <div className={styles['cart__product-price-wrapper']}>
                        <p className={styles['cart__product-price']}>{price}</p>
                        <span>₴</span>
                    </div>
                </div>
            </section>
        </article>
    );
};
