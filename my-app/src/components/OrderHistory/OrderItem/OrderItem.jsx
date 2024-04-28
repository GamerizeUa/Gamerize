import { useEffect, useState } from "react";
import styles from "./OrderItem.module.css";

const OrderItem = ({ order: { status, deliveryDate, orderedItems } }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const orderSum = orderedItems?.reduce((total, order) => {
    return total + order.price;
  }, 0);

  let visibleStatus = "";
  const setVisibleStatus = () => {
    if (status === "Отримані") {
      return (visibleStatus = `Доставлено ${deliveryDate}`);
    } else if (status === "Відмінені") {
      return (visibleStatus = "Відмінено");
    } else return (visibleStatus = "У процесі");
  };
  setVisibleStatus();

  const getStatusClass = () => {
    if (status === "Отримані") {
      return styles.receivedStatus;
    } else if (status === "Відмінені") {
      return styles.cancelledStatus;
    } else return styles.defaultStatus;
  };

  const handleChangedSize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleChangedSize);
    return () => {
      window.removeEventListener("resize", handleChangedSize);
    };
  }, []);

  return (
    <li className={styles.orderItem}>
      {windowWidth < 744 && (
        <div className={styles.orderSum}>
          <p>Сума замовлення:</p>
          <p>{orderSum} ₴</p>
        </div>
      )}
      <div className={`${styles.statusMark} ${getStatusClass()}`} />
      <div className={styles.orderStatus}>
        <div className={`${styles.statusDot} ${getStatusClass()}`} />
        <p className={styles.statusText}>{visibleStatus}</p>
      </div>
      <div className={styles.orderContent}>
        <ul className={styles.productList}>
          {orderedItems?.map(({ id, photo, name, price, article }) => (
            <li key={id} className={styles.productListItem}>
              <img src={photo} className={styles.productListImg} />
              <div className={styles.productDescription}>
                <p className={styles.productName}>{name}</p>
                <p className={styles.productPrice}>Ціна: {price} ₴</p>
                <p className={styles.productArticle}>Артикул: {article}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.orderDetailsWrapper}>
          {windowWidth >= 744 && (
            <div className={styles.orderSum}>
              <p>Сума замовлення:</p>
              <p>{orderSum} ₴</p>
            </div>
          )}
          <button className={styles.orderDetailsBtn}>Деталі замовлення</button>
        </div>
      </div>
    </li>
  );
};

export default OrderItem;
