import CrossIcon from "../icons/CrossIcon";
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
                    {/* <button className={styles.cartProductCounterBtn}> */}
                    <svg
                      width="10"
                      height="1"
                      viewBox="0 0 10 1"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="10" height="1" rx="0.5" fill="#2B2B2B" />
                    </svg>
                    {/* </button> */}
                    <p>1</p>
                    {/* <button className={styles.cartProductCounterBtn}> */}
                    <svg
                      width="9"
                      height="9"
                      viewBox="0 0 9 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        y="4"
                        width="9"
                        height="0.9"
                        rx="0.45"
                        fill="#2B2B2B"
                      />
                      <rect
                        x="4"
                        y="9"
                        width="9"
                        height="1"
                        rx="0.5"
                        transform="rotate(-90 4 9)"
                        fill="#2B2B2B"
                      />
                    </svg>
                    {/* </button> */}
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
                    {/* <button className={styles.cartProductCounterBtn}> */}
                    <svg
                      width="10"
                      height="1"
                      viewBox="0 0 10 1"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="10" height="1" rx="0.5" fill="#2B2B2B" />
                    </svg>
                    {/* </button> */}
                    <p>1</p>
                    {/* <button className={styles.cartProductCounterBtn}> */}
                    <svg
                      width="9"
                      height="9"
                      viewBox="0 0 9 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        y="4"
                        width="9"
                        height="0.9"
                        rx="0.45"
                        fill="#2B2B2B"
                      />
                      <rect
                        x="4"
                        y="9"
                        width="9"
                        height="1"
                        rx="0.5"
                        transform="rotate(-90 4 9)"
                        fill="#2B2B2B"
                      />
                    </svg>
                    {/* </button> */}
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
