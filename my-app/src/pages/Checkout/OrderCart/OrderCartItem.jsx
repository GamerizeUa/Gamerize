import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { removeFromCart, updateCartProduct } from '@/redux/cartSlice.js';
import styles from './OrderCart.module.css';
import sprite from '@/assets/icons/sprite.svg';
import CrossIcon from '@/assets/icons/CrossIcon.jsx';
import { getImagePath } from '@/utils/getImagePath.js';
import {useLocation} from "react-router-dom";

export const OrderCartItem = ({ id, name, price, photo, count, setOneProductQuantity}) => {
    const dispatch = useDispatch();
    const [countFieldValue, setCountFieldValue] = useState(count);
    const location = useLocation();

    const handleCountChange = (newCount) => {
        if (isNaN(newCount) || newCount <= 0) return;

        if(location.state){
            setCountFieldValue(newCount)
            setOneProductQuantity(newCount)
            return;
        }

        setCountFieldValue(
            newCount <= 0 ? dispatch(removeFromCart(id)) : newCount
        );

        dispatch(updateCartProduct({ id, modifier: newCount - count }));
    };

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(id));
    };

    return (
        <li className={styles.cartListItem}>
            <img
                src={getImagePath(photo?.path)}
                width="90"
                height="90"
                alt={name}
                className={styles.cartImageItem}
            />
            <div className={styles.cartItemDescription}>
                <div className={styles.titleWrapper}>
                    <p className={styles.cartProductTitle}>{name}</p>
                    <div
                        className={styles.removeBtn}
                        onClick={handleRemoveFromCart}
                    >
                        <CrossIcon color={'#1E2128'} width={16} height={16} />
                    </div>
                </div>
                <p className={styles.cartProductArticle}>Артикул: {id}</p>
                <div className={styles.cartCounterWrapper}>
                    <div className={styles.cartProductCounter}>
                        <div
                            onClick={() => handleCountChange(location.state ? countFieldValue - 1 : count - 1)}
                            className={styles.cartCounter}
                        >
                            <svg width="9" height="9">
                                <use href={sprite + '#icon-minus'}></use>
                            </svg>
                        </div>
                        <p>{countFieldValue}</p>
                        <div
                            className={styles.cartCounter}
                            onClick={() => handleCountChange(location.state ? countFieldValue + 1 : count + 1)}
                        >
                            <svg width="9" height="9">
                                <use href={sprite + '#icon-plus'}></use>
                            </svg>
                        </div>
                    </div>
                    <div className={styles.cartProductPriceWrapper}>
                        <p className={styles.cartProductPrice}>
                            {location.state ? countFieldValue * price : price * count}
                        </p>
                        <span>₴</span>
                    </div>
                </div>
            </div>
        </li>
    );
};
