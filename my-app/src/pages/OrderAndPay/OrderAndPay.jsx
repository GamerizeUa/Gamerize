import styles from "./OrderAndPay.module.css";

export default function OrderAndPay() {
  return (
    <div className={styles.pageWrapper + " container"}>
      <h1 className={styles.mainTitle}>Оплата і доставка</h1>
      <h2 className={styles.secondaryTitle}>Достака</h2>
      <p className={styles.mainText}>
        Доставка замовлень з інтернет-магазину Gamerise можлива двома компаніями
        перевізниками: Нова пошта та Укрпошта. Варіанти доставки розраховуються
        за тарифами перевізника
      </p>
      <h4 className={styles.deliveryTitle}>Доставка Укрпошта</h4>
      <p className={styles.mainText}>Переваги сервісу доставки “УКРПОЧТА”</p>
      <ul className={styles.deliveryList}>
        <li className={styles.mainText}>Вартість від 50 грн</li>
        <li className={styles.mainText}>Післяплата 1% (мін.сума 10 грн)</li>
        <li className={styles.mainText}>
          Термін доставки 1-2 дні, захід України 2-3 дні
        </li>
      </ul>
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
      <h2 className={styles.secondaryTitle}>Оплата</h2>
      <ul className={styles.paymentList}>
        <li className={styles.mainText}>
          Онлайн оплата карткою Visa/MasterCard через LiqPay.LiqPay – це система
          миттєвих платежів, створена ПриватБанком (Україна)
        </li>
        <li className={styles.mainText}>
          За допомогою сервісів Google Pay, Apple Pay
        </li>
      </ul>
      <div className={styles.warningBlock}>
        <h3 className={styles.warningTitle}>Увага</h3>
        <p className={styles.warningText}>
          Замовлення зберігається на складі транспортної компанії трохи більше
          5-ти робочих днів, після вичерпання цього терміну – відправляється
          назад
        </p>
      </div>
      <h2 className={styles.secondaryTitle}>Повернення</h2>
      <ul className={styles.returnListText}>
        <li className={styles.mainText}>
          Можливо здійснити повернення товару, який не входить в «Перелік
          товарів належної якості, що не підлягають поверненню», якщо вони не
          задовольняють споживачів з будь-яких причин, протягом 14
          (чотирнадцяти) днів з моменту покупки такого товару.
        </li>
        <li className={styles.mainText}>
          Повернення грошових коштів за такий товар, оплачених раніше,
          здійснюється протягом 30 (тридцяти) календарних днів з моменту
          отримання товару назад Продавцем та заяви про його повернення.Заява
          має бути складена власноруч та мати орігинал підпису Покупця.
        </li>
      </ul>
      <p className={styles.returnTitle}>Повернення товару можливо:</p>
      <ul className={`${styles.returnList} ${styles.mainText}`}>
        <li>якщо він не використовувався;</li>
        <li>якщо збережено його товарний вигляд;</li>
        <li>не пошкодженні споживчі властивості, пломби, ярлики;</li>
        <li>
          в наявності є розрахунковий документ, виданий споживачеві разом з
          проданим товаром.
        </li>
      </ul>
      <p className={styles.returnTitle}>
        Товар разом з заявою встановленого зразку необхідно відправити за
        наступною адресою:
      </p>
      <ul className={styles.mainText}>
        {" "}
        <li>м. [Місто], вул. , 27,</li>
        <li>ТОВ «НУМІС» ЄДРПОУ 44762781</li>
        <li>Імя</li>
        <li>Телефон: +000 0000 000</li>
      </ul>
    </div>
  );
}
