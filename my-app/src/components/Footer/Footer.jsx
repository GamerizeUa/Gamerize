import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import sprite from "../../assets/icons/sprite.svg";
import styles from "./Footer.module.css";
import handleLinkClick from "../../helpers/ScrollToTop";

const Footer = () => {
  return (
    <div className={styles.footerWrap}>
      <div className={styles.footer}>
        <div className={styles.footerListWrapper}>
          <Logo />
          <ul className={styles.toUsersList}>
            <p className={styles.footerListHeader}>Користувачам</p>
            <li onClick={handleLinkClick}>
              <Link to="order-pay" className={styles.footerListLink}>
                Оплата і доставка
              </Link>
            </li>
            <li onClick={handleLinkClick}>
              <Link to="return" className={styles.footerListLink}>
                Умови повернення
              </Link>
            </li>
            <li onClick={handleLinkClick}>
              <Link to="about" className={styles.footerListLink}>
                Про нас
              </Link>
            </li>
          </ul>
          <ul className={styles.navList}>
            <p className={styles.footerListHeader}>Навігація</p>
            <li onClick={handleLinkClick}>
              <Link to="/catalog" className={styles.footerListLink}>
                Настільні ігри
              </Link>
            </li>
            <li onClick={handleLinkClick}>
              <Link to="/catalog" className={styles.footerListLink}>
                Жанри
              </Link>
            </li>
            <li onClick={handleLinkClick}>
              <Link to="/catalog" className={styles.footerListLink}>
                Тематика
              </Link>
            </li>
            <li onClick={handleLinkClick}>
              <Link to="/catalog" className={styles.footerListLink}>
                Пазли
              </Link>
            </li>
            <li onClick={handleLinkClick}>
              <Link to="/catalog" className={styles.footerListLink}>
                Головоломки
              </Link>
            </li>
          </ul>
          <ul className={styles.contactsList}>
            <p className={styles.footerListHeader}>Контактна інформація</p>
            <li>
              <a
                href="tel:+380987067447"
                rel="noopener noreferrer"
                className={styles.telLink + " " + styles.footerListLink}
              >
                <svg width={24} height={24}>
                  <use
                    href={sprite + "#icon-phone"}
                    stroke="currentColor"
                    fill="#AAC4FF"
                  />
                </svg>
                <p>+380 98 7067 447</p>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className={styles.footerListLink}
              >
                <svg width={35} height={35}>
                  <use href={sprite + "#icon-Instagram"}></use>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                className={styles.fbIcon + " " + styles.footerListLink}
              >
                <svg width={35} height={35}>
                  <use href={sprite + "#icon-Facebook"}></use>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <p className={styles.rights}>© 2024 Gamerise. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
