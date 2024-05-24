import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPromoCode, setGiftCard } from "../../../redux/discountSlice";
import { selectGiftCard, selectPromoCode } from "../../../redux/selectors";
import styles from "./OrderCart.module.css";
import sprite from "../../../assets/icons/sprite.svg";

export const OrderCartInputs = () => {
  const dispatch = useDispatch();
  const promoCode = useSelector(selectPromoCode);
  const giftCard = useSelector(selectGiftCard);
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState(null);

  const MAX_LENGTH = 20;

  const handleEditClick = (field, event) => {
    event.stopPropagation();
    setIsEditing(true);
    setEditingField(field);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (value.length <= MAX_LENGTH) {
      if (name === "promoCode") dispatch(setPromoCode(value));
      else if (name === "giftCard") dispatch(setGiftCard(value));
    }
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
    <div className={styles.discountContainer}>
      {(isEditing && editingField === "promoCode") || promoCode ? (
        <input
          name="promoCode"
          placeholder="Enter the promo code number"
          value={promoCode}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={styles.discountInput}
          maxLength={MAX_LENGTH}
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
      {(isEditing && editingField === "giftCard") || giftCard ? (
        <input
          name="giftCard"
          placeholder="Enter the gift card number"
          value={giftCard}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={styles.discountInput}
          maxLength={MAX_LENGTH}
        />
      ) : (
        <div
          onClick={(event) => handleEditClick("giftCard", event)}
          className={styles.discountItem}
        >
          <svg width={24} height={24}>
            <use href={sprite + "#icon-gift"} stroke="#2B2B2B" fill="#eef1ff" />
          </svg>
          <p className={styles.discountText}>Подарункова карта</p>
        </div>
      )}
    </div>
  );
};
