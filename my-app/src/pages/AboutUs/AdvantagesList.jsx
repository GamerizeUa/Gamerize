import styles from "./AboutUs.module.css";
import sprite from "../../assets/icons/sprite.svg";

export default function AdvantagesList() {
  return (
    <div className={styles.advantagesListWrapper}>
      <h2 className={styles.advantagesTitle}>Наші переваги</h2>
      <ul className={styles.advantagesList}>
        <li className={styles.advantagesItem}>
          <svg>
            <use
              href={sprite + "#icon-star"}
              fill="#EEF1FF"
              stroke="currentColor"
            ></use>
          </svg>
          <p className={styles.advantagesText}>Висока якість</p>
        </li>
        <li className={styles.advantagesItem}>
          <svg>
            <use
              href={sprite + "#icon-package"}
              fill="#EEF1FF"
              stroke="currentColor"
            ></use>
          </svg>
          <p className={styles.advantagesText}>Швидка доставка</p>
        </li>
        <li className={styles.advantagesItem}>
          <svg>
            <use
              href={sprite + "#icon-wallet"}
              fill="#EEF1FF"
              stroke="currentColor"
            ></use>
          </svg>
          <p className={styles.advantagesText}>Доступні ціни</p>
        </li>
      </ul>
    </div>
  );
}
