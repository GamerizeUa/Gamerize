import styles from "./AboutUs.module.css";
import imageAboutUs from "../../assets/images/about_us_photo.png";
import { useEffect, useState } from "react";
import AdvantagesList from "./AdvantagesList";

export default function AboutUs() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
    <div className={styles.pageWrapper + " container"}>
      <h1 className={styles.title}>Про нас</h1>
      <div className={styles.blocksWrapper}>
        <div>
          <ul className={styles.decriptionList}>
            <li>
              <p>
                Ми – команда ентузіастів, яка вірить у силу ігор для об'єднання
                сімей, друзів та колег. Ми прагнемо зробити доступними найкращі
                настільні ігри для всіх.
              </p>
            </li>
            <li>
              <p>
                Наш магазин – це не просто торгова платформа, але і вірний
                союзник у вашому пошуку найцікавіших, найзахоплюючіших та
                найсучасніших настільних ігор.
              </p>
            </li>
            {windowWidth > 744 && (
              <li>
                <p>
                  У нас ви знайдете широкий вибір настільних ігор для будь-якого
                  віку та ігрового смаку. Від класичних настільних ігор, що
                  запам'ятовуються з дитинства, до новітніх стратегічних ігор,
                  які випробовують ваші розумові здібності.
                </p>
              </li>
            )}
            <li>
              {windowWidth < 744 && (
                <img className={styles.teamImg} src={imageAboutUs} />
              )}
            </li>
            <li>
              <p>
                Ми віримо в те, що настільні ігри – це не просто забава, але й
                чудовий спосіб зближення людей. Ми прагнемо робити ваші моменти
                гри незабутніми та наповненими радістю.
              </p>
            </li>
            <li>
              <p>
                Обирайте якість, вибирайте розвагу, обирайте наш онлайн магазин
                настільних ігор – ваш вірний партнер у світі ігор та
                неперевершеного відпочинку!
              </p>
            </li>
          </ul>
          {windowWidth >= 1280 && <AdvantagesList />}
        </div>
        {windowWidth >= 744 && (
          <div className={styles.teamBlock}>
            <img className={styles.teamImg} src={imageAboutUs} />
          </div>
        )}
      </div>
      {windowWidth < 1280 && <AdvantagesList />}
      <ul className={styles.featureList}>
        <li className={styles.featureItem}>
          <p className={styles.feature}>19000+</p>
          <p className={styles.featureText}>Задоволених клієнтів</p>
        </li>
        <li className={styles.featureItem}>
          <p className={styles.feature}>34000+</p>
          <p className={styles.featureText}>Проданих ігор</p>
        </li>
        <li className={styles.featureItem}>
          <p className={styles.feature}>25+</p>
          <p className={styles.featureText}>Років на ринку</p>
        </li>
      </ul>
      <div className={styles.addressBlock}>
        <h3 className={styles.addressBlockTitle}>Де нас знайти?</h3>
        <p className={styles.addressBlockText}>
          Ми очікуємо на ваш візит та впевнені, що разом ми знайдемо ідеальну
          гру для вашого найкращого вечора в колі друзів та рідних!
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
  );
}
