import styles from "./AboutUs.module.css";
import imageAboutUs from "../../assets/images/about_us_photo.png";
import sprite from "../../assets/icons/sprite.svg";

export default function AboutUs() {
  return (
    <div className={styles.pageWrapper + " container"}>
      <h1 className={styles.title}>Про нас</h1>
      <div className={styles.blocksWrapper}>
        <div>
          <p className={styles.decription}>
            Ми – команда ентузіастів, яка вірить у силу ігор для об'єднання
            сімей, друзів та колег. Ми прагнемо зробити доступними найкращі
            настільні ігри для всіх. Наш магазин – це не просто торгова
            платформа, але і вірний союзник у вашому пошуку найцікавіших,
            найзахоплюючіших та найсучасніших настільних ігор.
            <br /> <br />У нас ви знайдете широкий вибір настільних ігор для
            будь-якого віку та ігрового смаку. Від класичних настільних ігор, що
            запам'ятовуються з дитинства, до новітніх стратегічних ігор, які
            випробовують ваші розумові здібності.
            <br /> <br />
            Ми віримо в те, що настільні ігри – це не просто забава, але й
            чудовий спосіб зближення людей. Ми прагнемо робити ваші моменти гри
            незабутніми та наповненими радістю. <br />
            <br />
            Обирайте якість, вибирайте розвагу, обирайте наш онлайн магазин
            настільних ігор – ваш вірний партнер у світі ігор та неперевершеного
            відпочинку!
          </p>
          <h2 className={styles.advantagesTitle}>Наші переваги</h2>
          <ul className={styles.advantagesList}>
            <li className={styles.advantagesItem}>
              <svg width="51" height="51">
                <use
                  href={sprite + "#icon-star"}
                  fill="#EEF1FF"
                  stroke="currentColor"
                ></use>
              </svg>
              <p className={styles.advantagesText}>Висока якість</p>
            </li>
            <li className={styles.advantagesItem}>
              <svg width="51" height="51">
                <use
                  href={sprite + "#icon-package"}
                  fill="#EEF1FF"
                  stroke="currentColor"
                ></use>
              </svg>
              <p className={styles.advantagesText}>Швидка доставка</p>
            </li>
            <li className={styles.advantagesItem}>
              <svg width="51" height="51">
                <use
                  href={sprite + "#icon-wallet"}
                  fill="#EEF1FF"
                  stroke="currentColor"
                ></use>
              </svg>
              <p className={styles.advantagesText}>Доступні ціни</p>
            </li>
          </ul>
          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <p className={styles.feature}>19000+</p>
              <p className={styles.advantagesText}>Задоволених клієнтів</p>
            </li>
            <li className={styles.featureItem}>
              <p className={styles.feature}>34000+</p>
              <p className={styles.advantagesText}>Проданих ігор</p>
            </li>
            <li className={styles.featureItem}>
              <p className={styles.feature}>25+</p>
              <p className={styles.advantagesText}>Років на ринку</p>
            </li>
          </ul>
          <div className={styles.addressBlock}>
            <h3 className={styles.addressBlockTitle}>Де нас знайти?</h3>
            <p className={styles.addressBlockText}>
              Ми очікуємо на ваш візит та впевнені, що разом ми знайдемо
              ідеальну гру для вашого найкращого вечора в колі друзів та рідних!
            </p>
            <ul className={styles.addressList}>
              <li>Вулиця Гравецька, 42,</li>
              <li>Місто, Країна,</li>
              <li>Індекс: 12345</li>
            </ul>
          </div>
          <div className={styles.contactsBlock}>
            <h3 className={styles.contactsBlockTitle}>Наш контактний центр:</h3>
            <ul className={styles.contactsList}>
              <li>
                <p className={styles.contactsText}>Електронна пошта:</p>
                <a
                  className={styles.contactsLink}
                  href="info@gamerise@gmail.com"
                  rel="noopener noreferrer"
                >
                  info@gamerise@gmail.com
                </a>
              </li>
              <li>
                <p className={styles.contactsText}>Телефон:</p>
                <a
                  className={styles.contactsLink}
                  href="+380987067447  "
                  rel="noopener noreferrer"
                >
                  +380 98 7067 447
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.teamBlock}>
          <img className={styles.teamImg} src={imageAboutUs} />
          <svg className={styles.icon}>
            <use href={sprite + "#icon-wave_arrow"}></use>
          </svg>
          <h3 className={styles.teamBlockTitle}>Долучайся до нашої команди</h3>
          <button className={styles.teamBlockBtn}>Надіслати Заявку</button>
        </div>
      </div>
    </div>
  );
}
