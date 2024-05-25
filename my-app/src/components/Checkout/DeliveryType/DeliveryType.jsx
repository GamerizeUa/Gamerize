import { useState } from "react";
import styles from "./DeliveryType.module.css";
import { AddressForm } from "./AddressForm";

export const DeliveryType = ({ onSubmit, currentStep, setCurrentStep }) => {
  const [deliveryMethod, setDeliveryMethod] = useState("");

  const handleRadioClick = (method) => {
    setDeliveryMethod(method);
    document.getElementById(method).checked = true;
  };

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
      <div
        className={styles.pickupBlock}
        onClick={() => handleRadioClick("pickup")}
      >
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
      <div className={styles.deliveryBlock}>
        <div
          className={styles.selectElement}
          onClick={() => handleRadioClick("delivery")}
        >
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
        {deliveryMethod === "delivery" && <AddressForm></AddressForm>}
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
