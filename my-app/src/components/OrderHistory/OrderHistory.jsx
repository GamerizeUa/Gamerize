import { useState } from "react";
import styles from "./OrderHistory.module.css";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import ArrowUpIcon from "../icons/ArrowUpIcon";
import OrderItem from "./OrderItem/OrderItem";
import mainProductPhoto from "../../assets/images/mainProductPhoto.png";

const orders = [
  {
    id: 1,
    status: "У процесі",
    orderDate: "10.11.2022",
    deliveryDate: "15.11.2022",
    orderedItems: [
      {
        id: 125,
        article: 12121212,
        name: "Краща версія себе",
        price: 1000,
        photo: mainProductPhoto,
      },
      {
        id: 112,
        article: 12121212,
        name: "Кодові імена: гра слів",
        price: 1000,
        photo: mainProductPhoto,
      },
      {
        id: 165,
        article: 12121212,
        name: "Краща версія себе",
        price: 1000,
        photo: mainProductPhoto,
      },
      {
        id: 142,
        article: 12121212,
        name: "Краща версія себе",
        price: 1000,
        photo: mainProductPhoto,
      },
    ],
  },
  {
    id: 2,
    status: "Відмінені",
    orderDate: "05.03.2023",
    deliveryDate: "",
    orderedItems: [
      {
        id: 976,
        article: 12121212,
        name: "Дюна імперіум1",
        price: 2250,
        photo:
          "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
      },
      {
        id: 4668,
        article: 12121212,
        name: "Кодові імена: гра слів",
        price: 2250,
        photo: mainProductPhoto,
      },
    ],
  },
  {
    id: 3,
    status: "Отримані",
    orderDate: "30.12.2023",
    deliveryDate: "03.01.2024",
    orderedItems: [
      {
        id: 359,
        article: 12121212,
        name: "Кодові імена: гра слів",
        price: 1550,
        photo: mainProductPhoto,
      },
      {
        id: 654,
        article: 12121212,
        name: "Дюна імперіум2",
        price: 2250,
        photo:
          "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
      },
    ],
  },
  {
    id: 4,
    status: "Відмінені",
    orderDate: "05.02.2024",
    deliveryDate: "",
    orderedItems: [
      {
        id: 125,
        article: 12121212,
        name: "Краща версія себе",
        price: 1000,
        photo: mainProductPhoto,
      },
      {
        id: 112,
        article: 12121212,
        name: "Кодові імена: гра слів",
        price: 1000,
        photo: mainProductPhoto,
      },
    ],
  },
  {
    id: 5,
    status: "Отримані",
    orderDate: "10.02.2024",
    deliveryDate: "12.02.2024",
    orderedItems: [
      {
        id: 653,
        article: 12121212,
        name: "Краща версія себе",
        price: 1000,
        photo:
          "https://geekach.com.ua/content/images/25/429x480l99nn0/duna-imperium-ukr-dune-imperium-39895584897046.png",
      },
      {
        id: 456,
        article: 12121212,
        name: "Кодові імена: гра слів",
        price: 1000,
        photo: mainProductPhoto,
      },
    ],
  },
  {
    id: 6,
    status: "Отримані",
    orderDate: "12.02.2024",
    deliveryDate: "",
    orderedItems: [
      {
        id: 125,
        article: 12121212,
        name: "Краща версія себе",
        price: 1000,
        photo: mainProductPhoto,
      },
      {
        id: 112,
        article: 12121212,
        name: "Кодові імена: гра слів",
        price: 1000,
        photo: mainProductPhoto,
      },
    ],
  },
];

const OrderHistory = () => {
  const [filter, setFilter] = useState("Всі замовлення");
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const toggleSelector = () => {
    setIsSelectorOpen((prevIsSelectorOpen) => !prevIsSelectorOpen);
  };

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
    setIsSelectorOpen(false);
  };

  const visibleOrder =
    filter === "Всі замовлення"
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <div className={styles.pageWrapper + " container"}>
      <h1 className={styles.title}>Історія замовлень</h1>
      <div className={styles.orderWrapper}>
        <button className={styles.selectingBtn} onClick={toggleSelector}>
          <p className={styles.selectingBtnText}>{filter}</p>
          {isSelectorOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </button>
        <p className={styles.ordersAmount}>
          {orders.length}{" "}
          {orders.length % 10 >= 1 && orders.length % 10 <= 4
            ? "замовлення"
            : "замовлень"}
        </p>
        <ul className={styles.orderList}>
          {visibleOrder.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </ul>
        {isSelectorOpen && (
          <div className={styles.selectorWrapper}>
            <div className={styles.selectorContent}>
              <div className={styles.selectorItem}>
                <div className={styles.inputWrapper}>
                  <span className={styles.fakeInput} />
                  <input
                    type="radio"
                    id="all"
                    name="filter"
                    value="Всі замовлення"
                    checked={filter === "Всі замовлення"}
                    onChange={handleChangeFilter}
                    className={styles.selectorInput}
                  />
                </div>
                <label htmlFor="all" className={styles.selectorLabel}>
                  Всі замовлення
                </label>
              </div>

              <div className={styles.selectorItem}>
                <div className={styles.inputWrapper}>
                  <span className={styles.fakeInput} />
                  <input
                    type="radio"
                    id="received"
                    name="filter"
                    value="Отримані"
                    checked={filter === "Отримані"}
                    onChange={handleChangeFilter}
                    className={styles.selectorInput}
                  />
                </div>
                <label htmlFor="received" className={styles.selectorLabel}>
                  Отримані
                </label>
              </div>

              <div className={styles.selectorItem}>
                <div className={styles.inputWrapper}>
                  <span className={styles.fakeInput} />
                  <input
                    type="radio"
                    id="cancelled"
                    name="filter"
                    value="Відмінені"
                    checked={filter === "Відмінені"}
                    onChange={handleChangeFilter}
                    className={styles.selectorInput}
                  />
                </div>
                <label htmlFor="cancelled" className={styles.selectorLabel}>
                  Відмінені
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
