import { useSelector } from "react-redux";
import { selectCart } from "../../../redux/selectors";
import { OrderCartItem } from "./OrderCartItem";
import { OrderCartInputs } from "./OrderCartInputs";
import styles from "./OrderCart.module.css";
import sprite from "../../../assets/icons/sprite.svg";

export const OrderCart = () => {
  const { isEmpty, productList, total } = useSelector(selectCart);

  return (
    <div>
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
          <div className={styles.priceElement}>
            <p>Доставка:</p>
            <p>Безкоштовно</p>
          </div>
        </div>
        <div className={styles.totalPriceContainer}>
          <p>Загалом:</p>
          <div className={styles.inner}>
            <p>{total}</p>
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
