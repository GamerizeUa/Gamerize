import styles from "./AboutUs.module.css";
import imageAboutUs from "../../assets/images/about_us_photo.png";
import WaveArrowIcon from "../../components/icons/WaveArrow";

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
              <svg
                width="51"
                height="51"
                viewBox="0 0 51 51"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M46.75 25.5H42.5M40.5258 40.526L37.5206 37.5208M8.5 25.5H4.25M13.4787 13.4792L10.4735 10.474M25.5 8.5V4.25M37.5206 13.4792L40.5258 10.474M25.5 46.75V42.5M10.4735 40.526L13.4787 37.5208M25.5 14.875L28.7831 21.5262L36.125 22.5994L30.8125 27.7737L32.0663 35.0837L25.5 31.6306L18.9337 35.0837L20.1875 27.7737L14.875 22.5994L22.2169 21.5262L25.5 14.875Z"
                  stroke="#2B2B2B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className={styles.advantagesText}>Висока якість</p>
            </li>
            <li className={styles.advantagesItem}>
              <svg
                width="51"
                height="51"
                viewBox="0 0 51 51"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M43.5624 15.4652L25.4999 25.4999M25.4999 25.4999L7.43743 15.4652M25.4999 25.4999L25.5 45.6875M44.625 34.1244V16.8756C44.625 16.1475 44.625 15.7834 44.5177 15.4587C44.4228 15.1714 44.2677 14.9078 44.0627 14.6853C43.8309 14.4338 43.5127 14.257 42.8762 13.9034L27.1512 5.16732C26.5485 4.83251 26.2472 4.66511 25.9281 4.59947C25.6457 4.54139 25.3544 4.54139 25.0719 4.59947C24.7528 4.66511 24.4515 4.83251 23.8488 5.16732L8.12381 13.9034C7.48733 14.257 7.16908 14.4338 6.93735 14.6853C6.73233 14.9078 6.57719 15.1715 6.48228 15.4587C6.375 15.7834 6.375 16.1475 6.375 16.8756V34.1244C6.375 34.8525 6.375 35.2166 6.48228 35.5413C6.57719 35.8285 6.73234 36.0922 6.93735 36.3147C7.16908 36.5662 7.48733 36.743 8.12382 37.0966L23.8488 45.8327C24.4515 46.1675 24.7528 46.3349 25.0719 46.4005C25.3544 46.4586 25.6457 46.4586 25.9281 46.4005C26.2472 46.3349 26.5485 46.1675 27.1512 45.8327L42.8762 37.0966C43.5127 36.743 43.8309 36.5662 44.0627 36.3147C44.2677 36.0922 44.4228 35.8285 44.5177 35.5413C44.625 35.2166 44.625 34.8525 44.625 34.1244Z"
                  stroke="#2B2B2B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M35.0625 20.1875L15.9375 9.5625"
                  stroke="#2B2B2B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className={styles.advantagesText}>Швидка доставка</p>
            </li>
            <li className={styles.advantagesItem}>
              <svg
                width="52"
                height="51"
                viewBox="0 0 52 51"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M34.5 16.9999V9.56383C34.5 7.79639 34.5 6.91266 34.1277 6.36957C33.8024 5.89508 33.2986 5.57274 32.7315 5.47624C32.0824 5.36577 31.28 5.73611 29.6752 6.47677L10.8254 15.1767C9.3942 15.8372 8.6786 16.1675 8.15447 16.6797C7.69112 17.1326 7.33744 17.6854 7.12045 18.2958C6.875 18.9864 6.875 19.7745 6.875 21.3508V31.8749M35.5625 30.8124H35.5838M6.875 23.7999L6.875 37.8249C6.875 40.2052 6.875 41.3953 7.33822 42.3044C7.74568 43.1041 8.39585 43.7543 9.19554 44.1617C10.1047 44.6249 11.2948 44.6249 13.675 44.6249H38.325C40.7052 44.6249 41.8953 44.6249 42.8045 44.1617C43.6041 43.7543 44.2543 43.1041 44.6618 42.3044C45.125 41.3953 45.125 40.2052 45.125 37.8249V23.7999C45.125 21.4197 45.125 20.2296 44.6618 19.3205C44.2543 18.5208 43.6042 17.8706 42.8045 17.4632C41.8953 16.9999 40.7052 16.9999 38.325 16.9999L13.675 16.9999C11.2948 16.9999 10.1047 16.9999 9.19554 17.4632C8.39585 17.8706 7.74568 18.5208 7.33822 19.3205C6.875 20.2296 6.875 21.4197 6.875 23.7999ZM36.625 30.8124C36.625 31.3992 36.1493 31.8749 35.5625 31.8749C34.9757 31.8749 34.5 31.3992 34.5 30.8124C34.5 30.2256 34.9757 29.7499 35.5625 29.7499C36.1493 29.7499 36.625 30.2256 36.625 30.8124Z"
                  stroke="#2B2B2B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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
          <div className={styles.iconWrapper}>
            <WaveArrowIcon />
          </div>
          <h3 className={styles.teamBlockTitle}>Долучайся до нашої команди</h3>
          <button className={styles.teamBlockBtn}>Надіслати Заявку</button>
        </div>
      </div>
    </div>
  );
}
