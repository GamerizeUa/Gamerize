import { useDispatch } from "react-redux";
import { useState } from "react";
import { removeFromCart, updateCartProduct } from "../../../redux/cartSlice";
import styles from "./OrderCart.module.css";
import sprite from "../../../assets/icons/sprite.svg";
import CrossIcon from "../../icons/CrossIcon";

export const OrderCartItem = ({ id, name, price, photo, count }) => {
  const dispatch = useDispatch();
  const [countFieldValue, setCountFieldValue] = useState(count);

  const handleCountChange = (newCount) => {
    setCountFieldValue(newCount);
    dispatch(updateCartProduct({ id, modifier: newCount - count }));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <li className={styles.cartListItem}>
      <img src={photo} width="90" height="90" alt={name} />
      <div className={styles.cartItemDescription}>
        <div className={styles.titleWrapper}>
          <p className={styles.cartProductTitle}>{name}</p>
          <div className={styles.removeBtn} onClick={handleRemoveFromCart}>
            <CrossIcon color={"#1E2128"} width={16} height={16} />
          </div>
        </div>
        <p className={styles.cartProductArticle}>Артикул: {id}</p>
        <div className={styles.cartCounterWrapper}>
          <div className={styles.cartProductCounter}>
            <div
              onClick={() => handleCountChange(count - 1)}
              className={styles.cartCounter}
            >
              <svg width="9" height="9">
                <use href={sprite + "#icon-minus"}></use>
              </svg>
            </div>
            <p>{countFieldValue}</p>
            <div
              className={styles.cartCounter}
              onClick={() => handleCountChange(count + 1)}
            >
              <svg width="9" height="9">
                <use href={sprite + "#icon-plus"}></use>
              </svg>
            </div>
          </div>
          <div className={styles.cartProductPriceWrapper}>
            <p className={styles.cartProductPrice}>{price * count}</p>
            <span>₴</span>
          </div>
        </div>
      </div>
    </li>
  );
};
