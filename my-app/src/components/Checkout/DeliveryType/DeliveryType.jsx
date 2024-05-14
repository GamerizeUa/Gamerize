import { useState } from "react";
import styles from "./DeliveryType.module.css";

export const DeliveryType = ({ onSubmit, currentStep, setCurrentStep }) => {
  const [deliveryMethod, setDeliveryMethod] = useState("");

  const handleContinue = () => {
    if (deliveryMethod) {
      onSubmit({ deliveryMethod });
      setCurrentStep(currentStep + 1);
    } else {
      alert("Будь ласка, оберіть спосіб доставки");
    }
  };

  return (
    <div>
      <p className={styles.header}>2. Спосіб доставки</p>
      <div className={styles.selectElement}>
        <div>
          <div className={styles.radioInputBox}>
            <div className={styles.inputWrapper}>
              <span className={styles.fakeInput} />
              <input
                type="radio"
                id="pickup"
                value="pickup"
                name="deliveryMethod"
                className={styles.selectorInput}
                onChange={() => setDeliveryMethod("pickup")}
              />
            </div>
            <label htmlFor="pickup" className={styles.orderText}>
              Самовивіз
            </label>
          </div>
          <p className={styles.details}>
            Ви можете самостійно забрати ваше замовлення за адресою м. Київ,
            вул. Ярославська, 9. Самовивезення приймаємо з 11:00 – 22:00/Пн-Нд.
          </p>
        </div>
        <p className={styles.orderText}>Безкоштовно</p>
      </div>
      <div className={styles.selectElement}>
        <div className={styles.radioInputBox}>
          <div className={styles.inputWrapper}>
            <span className={styles.fakeInput} />
            <input
              type="radio"
              id="delivery"
              value="delivery"
              name="deliveryMethod"
              className={styles.selectorInput}
              onChange={() => setDeliveryMethod("delivery")}
            />
          </div>
          <label htmlFor="delivery" className={styles.orderText}>
            Доставка
          </label>
        </div>
        <p className={styles.orderText}>Безкоштовно</p>
      </div>
      <button
        className={styles.orderBtn}
        onClick={handleContinue}
        disabled={currentStep != 2}
      >
        Продовжити
      </button>
    </div>
  );
};
