import styles from "./OrderAndPay.module.css";

export default function OrderAndPay() {
  return (
    <div className={styles.pageWrapper + " container"}>
      <h1>Оплата і доставка</h1>
      <h2>Достака</h2>
      <p>
        Доставка замовлень з інтернет-магазину Gamerise можлива двома компаніями
        перевізниками: Нова пошта та Укрпошта. Варіанти доставки розраховуються
        за тарифами перевізника.
      </p>
    </div>
  );
}
