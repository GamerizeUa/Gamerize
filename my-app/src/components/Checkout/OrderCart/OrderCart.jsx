import {useDispatch, useSelector} from "react-redux";
import {selectCart} from "../../../redux/selectors";
import { OrderCartItem } from "./OrderCartItem";
import { OrderCartInputs } from "./OrderCartInputs";
import {sendPromoCode} from '../../../redux/discountSlice.js'
import sprite from "../../../assets/icons/sprite.svg";
import styles from "./OrderCart.module.css";
import {useEffect, useState} from "react";

export const OrderCart = () => {
  const { isEmpty, productList, total } = useSelector(selectCart);
  const {discountValue} = useSelector((state) => state.discount);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    setFinalPrice(() => total - (parseFloat((total * (discountValue / 100)).toFixed(1))));
  }, [discountValue, total]);

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
                  <p>-{(total - finalPrice).toFixed(1)}</p>
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
            <p>{finalPrice}</p>
            <span>₴</span>
          </div>
        </div>
      </div>
      <div className={styles.safeMark}>
        <svg width={16} height={16}>
          <use href={sprite + "#icon-safe_lock"} />
        </svg>
        <p>Безпечна оплата</p>
      </div>
    </div>
  );
};
