import styles from "./DeliveryType.module.css";

export const DeliveryType = () => {
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
            />
          </div>
          <label htmlFor="delivery" className={styles.orderText}>
            Доставка
          </label>
        </div>
        <p className={styles.orderText}>Безкоштовно</p>
      </div>
      <button className={styles.orderBtn}>Продовжити</button>
    </div>
  );
};
