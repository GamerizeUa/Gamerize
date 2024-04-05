import { useEffect, useState } from "react";
import styles from "./OrderCart.module.css";
import sprite from "../../../assets/icons/sprite.svg";

export const OrderCart = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [giftCard, setGiftCard] = useState("");
  const [editingField, setEditingField] = useState(null);

  const handleEditClick = (field, event) => {
    event.stopPropagation();
    setIsEditing(true);
    setEditingField(field);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "promoCode") setPromoCode(value);
    else if (name === "giftCard") setGiftCard(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      console.log("Saved", editingField + ":", promoCode || giftCard);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      const isInput = target.tagName.toLowerCase() === "input";
      if (!isInput) {
        setEditingField(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className={styles.orderCart}>
        <div className={styles.titleWrapper}>
          <p className={styles.cartTitle}>Ваше замовлення</p>
          <p className={styles.changeCart}>Змінити кошик</p>
        </div>
        <ul className={styles.cartList}>
          <li className={styles.cartListItem}>
            <img
              src="https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png"
              width="90"
              height="90"
            />
            <div className={styles.cartItemDescription}>
              <p className={styles.cartProductTitle}>
                Настільна гра “Кодові імена”
              </p>
              <p className={styles.cartProductDescription}>Опис</p>
              <p className={styles.cartProductArticle}>Артикул: 123456</p>
              <div className={styles.cartCounterWrapper}>
                <div className={styles.cartProductCounter}>
                  <svg width="6" height="6">
                    <use href={sprite + "#icon-minus"}></use>
                  </svg>
                  <p>1</p>
                  <svg width="6" height="6">
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
            />
            <div className={styles.cartItemDescription}>
              <p className={styles.cartProductTitle}>
                Настільна гра “Кодові імена”
              </p>
              <p className={styles.cartProductDescription}>Опис</p>
              <p className={styles.cartProductArticle}>Артикул: 123456</p>
              <div className={styles.cartCounterWrapper}>
                <div className={styles.cartProductCounter}>
                  <svg width="6" height="6">
                    <use href={sprite + "#icon-minus"}></use>
                  </svg>
                  <p>1</p>
                  <svg width="6" height="6">
                    <use href={sprite + "#icon-plus"}></use>
                  </svg>
                </div>
                <div className={styles.cartProductPriceWrapper}>
                  <p>1200</p>
                  <span>₴</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div className={styles.discountContainer}>
          {isEditing && editingField === "promoCode" ? (
            <input
              name="promoCode"
              placeholder="Enter the promo code number"
              // type="text"
              value={promoCode}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={styles.discountInput}
            />
          ) : (
            <div
              onClick={(event) => handleEditClick("promoCode", event)}
              className={styles.discountItem}
            >
              <svg width={24} height={24}>
                <use
                  href={sprite + "#icon-promo_code"}
                  stroke="#2B2B2B"
                  fill="#eef1ff"
                />
              </svg>
              <p className={styles.discountText}>Ввести промокод</p>
            </div>
          )}
          {isEditing && editingField === "giftCard" ? (
            <input
              name="giftCard"
              placeholder="Enter the gift card number"
              // type="text"
              value={giftCard}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={styles.discountInput}
            />
          ) : (
            <div
              onClick={(event) => handleEditClick("giftCard", event)}
              className={styles.discountItem}
            >
              <svg width={24} height={24}>
                <use
                  href={sprite + "#icon-gift"}
                  stroke="#2B2B2B"
                  fill="#eef1ff"
                />
              </svg>
              <p className={styles.discountText}>Подарункова карта</p>
            </div>
          )}
        </div>
        <div className={styles.priceContainer}>
          <div className={styles.priceElement}>
            <p>Сума:</p>
            <div className={styles.inner}>
              <p>2700</p>
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
            <p>2700</p>
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
