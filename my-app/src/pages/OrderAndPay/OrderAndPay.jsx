import styles from "./OrderAndPay.module.css";

export default function OrderAndPay() {
  return (
    <div className={styles.pageWrapper + " container"}>
      <h1 className={styles.mainTitle}>Оплата і доставка</h1>
      <h2 className={styles.secondaryTitle}>Доставка</h2>
      <p className={styles.mainText}>
        Доставка замовлень з інтернет-магазину Gamerise можлива двома компаніями
        перевізниками: Нова пошта та Укрпошта. Варіанти доставки розраховуються
        за тарифами перевізника
      </p>
      <div className={styles.deliveryBlock}>
        <div>
          <h4 className={styles.deliveryTitle}>Доставка Укрпошта</h4>
          <p className={styles.deliverySecondaryTitle}>
            Переваги сервісу доставки “УКРПОШТА”
          </p>
          <ul className={styles.deliveryList}>
            <li className={styles.deliveryListItem}>Вартість від 50 грн</li>
            <li className={styles.deliveryListItem}>
              Післяплата 1% (мін.сума 10 грн)
            </li>
            <li className={styles.deliveryListItem}>
              Термін доставки 1-2 дні, захід України 2-3 дні
            </li>
          </ul>
        </div>
        <div>
          <h4 className={styles.deliveryTitle}>Доставка Нова пошта</h4>
          <p className={styles.deliverySecondaryTitle}>
            Переваги сервісу доставки “НОВА ПОШТА”
          </p>
          <ul className={styles.deliveryList}>
            <li className={styles.deliveryListItem}>Швидка доставка</li>
            <li className={styles.deliveryListItem}>
              Післяплата 1% (мін.сума 10 грн)
            </li>
            <li className={styles.deliveryListItem}>Термін доставки 1-2 дні</li>
          </ul>
        </div>
      </div>
      <div className={styles.warningBlock}>
        <h3 className={styles.warningTitle}>ВАЖЛИВО</h3>
        <p className={styles.warningText}>
          Gamerise намагається продуктивно обробляти всі замовлення, що
          надходять в інтернет-магазин. На жаль, деякі товари вже відсутні на
          складі та розподілені на роздрібну мережу. Тому для ефективної роботи
          логістики та максимально повної укомплектації ваших замовлень наша
          компанія здійснює відвантаження замовлень в інтернет магазині двома
          способами: зі складу та з роздрібних точок
        </p>
      </div>
      <div className={styles.paymentBlock}>
        <h2 className={styles.secondaryTitle}>Оплата</h2>
        <ul className={styles.paymentList}>
          <li className={styles.mainText}>
            Онлайн оплата карткою Visa/MasterCard через LiqPay. LiqPay – це
            система миттєвих платежів, створена ПриватБанком (Україна)
          </li>
          <li className={styles.mainText}>
            За допомогою сервісів Google Pay, Apple Pay
          </li>
          <li className={styles.mainText}>Накладений платіж</li>
        </ul>
      </div>
      <div className={styles.warningBlock}>
        <h3 className={styles.warningTitle}>Увага</h3>
        <p className={styles.warningText}>
          Замовлення зберігається на складі транспортної компанії трохи більше
          5-ти робочих днів, після вичерпання цього терміну – відправляється
          назад
        </p>
      </div>
    </div>
  );
}
