import styles from "./DeliveryType.module.css";

export const AddressForm = () => {
  return (
    <div>
      <p className={styles.addressText}>Введіть адресу</p>
      <form className={styles.addressForm}>
        <label htmlFor="city" className={styles.label}>
          Місто*
        </label>
        <select id="city" name="city" className={styles.selectInput}>
          <option value="city1">Виберіть місто</option>
          <option value="city2">Львів</option>
          <option value="city3">Харків</option>
          <option value="city3">Київ</option>
        </select>
        <label htmlFor="street" className={styles.label}>
          Вулиця*
        </label>
        <select id="street" name="street" className={styles.selectInput}>
          <option value="street1">Виберіть вулицю</option>
          <option value="street2">Бориспільська</option>
          <option value="street3">Харківська</option>
        </select>
        <label htmlFor="building" className={styles.label}>
          Будинок*
        </label>
        <select id="building" name="building" className={styles.selectInput}>
          <option value="building1">Виберіть будинок</option>
          <option value="building2">2</option>
          <option value="building3">5</option>
          <option value="building3">12</option>
        </select>
      </form>
    </div>
  );
};
