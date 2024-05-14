import { useState } from "react";
import visa from "../../../assets/images/Visa.png";
import mastercard from "../../../assets/images/Mastercard.png";
import sprite from "../../../assets/icons/sprite.svg";
import styles from "./PaymentType.module.css";

export const PaymentType = ({ onSubmit, currentStep, setCurrentStep }) => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleContinue = () => {
    if (paymentMethod) {
      onSubmit({ paymentMethod });
      setCurrentStep(currentStep + 1);
    } else {
      alert("Будь ласка, оберіть спосіб оплати");
    }
  };

  return (
    <div>
      <p className={styles.header}>3. Оплата</p>
      <div className={styles.selectElement}>
        <div>
          <div className={styles.radioInputBox}>
            <div className={styles.inputWrapper}>
              <span className={styles.fakeInput} />
              <input
                type="radio"
                id="cod"
                value="cod"
                name="payment"
                onChange={() => setPaymentMethod("cod")}
                className={styles.selectorInput}
              />
            </div>
            <label htmlFor="cod" className={styles.orderText}>
              Накладений платіж
            </label>
          </div>
          <p className={styles.details}>
            Оплата кур’єру при отриманні. Можлива як готівкою, так і
            безготівково
          </p>
        </div>
        <svg width={24} height={24}>
          <use href={sprite + "#icon-wallet_payment"} />
        </svg>
      </div>
      <div className={styles.selectElement}>
        <div className={styles.radioInputBox}>
          <div className={styles.inputWrapper}>
            <span className={styles.fakeInput} />
            <input
              type="radio"
              id="electronic"
              value="electronic"
              name="payment"
              onChange={() => setPaymentMethod("electronic")}
              className={styles.selectorInput}
            />
          </div>
          <label htmlFor="electronic" className={styles.orderText}>
            Електронна оплата
          </label>
        </div>
        <div className={styles.paymentImg}>
          <img src={mastercard} />
          <img src={visa} />
        </div>
      </div>
      <button
        onClick={handleContinue}
        className={styles.orderBtn}
        disabled={currentStep != 3}
      >
        Продовжити
      </button>
    </div>
  );
};
