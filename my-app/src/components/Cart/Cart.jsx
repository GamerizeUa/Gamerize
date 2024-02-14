import CrossIcon from "../icons/CrossIcon";
import sprite from "../../assets/icons/sprite.svg";
import styles from "./Cart.module.css";

const Cart = ({ cartClose }) => {
  const handleOverlayClick = (event) => {
    if (event.currentTarget === event.target) {
      cartClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleOverlayClick}>
      <div className={styles.cart}>
        <div className={styles.cartTitleWrapper}>
          <div className={styles.cartTitle}>Кошик</div>
          <button className={styles.crossCartBtn} onClick={cartClose}>
            <CrossIcon />
          </button>
        </div>
        <div className={styles.cartBox}>
          <ul className={styles.cartList}>
            <li className={styles.cartListItem}>
              <img
                src="https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png"
                width="90"
                height="90"
                className={styles.cartListImg}
              ></img>
              <div className={styles.cartItemDescription}>
                <p className={styles.cartProductTitle}>
                  Настільна гра “Кодові імена”
                </p>
                <p className={styles.cartProductDescription}>Опис</p>
                <p className={styles.cartProductArticle}>Артикул: 123456</p>
                <div className={styles.cartCounterWrapper}>
                  <div className={styles.cartProductCounter}>
                    <svg width="9" height="9">
                      <use href={sprite + "#icon-minus"}></use>
                    </svg>
                    <p>1</p>
                    <svg width="9" height="9">
                      <use href={sprite + "#icon-plus"}></use>
                    </svg>
                  </div>
                  <div className={styles.cartProductPriceWrapper}>
                    <p className={styles.cartProductPrice}>1200</p>
                    <span>₴</span>
                  </div>
                </div>
              </div>
            </li>
            <li className={styles.cartListItem}>
              <img
                src="https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png"
                width="90"
                height="90"
                className={styles.cartListImg}
              ></img>
              <div className={styles.cartItemDescription}>
                <p className={styles.cartProductTitle}>
                  Настільна гра “Кодові імена”
                </p>
                <p className={styles.cartProductDescription}>Опис</p>
                <p className={styles.cartProductArticle}>Артикул: 123456</p>
                <div className={styles.cartCounterWrapper}>
                  <div className={styles.cartProductCounter}>
                    <svg width="9" height="9">
                      <use href={sprite + "#icon-minus"}></use>
                    </svg>
                    <p>1</p>
                    <svg width="9" height="9">
                      <use href={sprite + "#icon-plus"}></use>
                    </svg>
                  </div>
                  <div className={styles.cartProductPriceWrapper}>
                    <p className={styles.cartProductPrice}>1200</p>
                    <span>₴</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div className={styles.totalPriceWrapper}>
            <p className={styles.totalPriceText}>Сума:</p>
            <p className={styles.totalPrice}>2700 ₴</p>
          </div>
        </div>
        <div className={styles.cartBtnWrapper}>
          <button className={styles.cartBtn} type="submit">
            Замовити
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
