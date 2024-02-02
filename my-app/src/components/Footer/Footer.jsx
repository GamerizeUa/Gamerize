import { Logo } from "../Logo/Logo";
import FacebookIcon from "../icons/FacebookIcon";
import InstagramIcon from "../icons/InstagramIcon";
import PhoneIcon from "../icons/PhoneIcon";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footerWrap}>
      <div className={styles.footer}>
        <div className={styles.footerListWrapper}>
          <Logo />
          <ul className={styles.toUsersList}>
            <p className={styles.footerListHeader}>Користувачам</p>
            <li>
              <a className={styles.footerListLink}>Оплата і доставка</a>
            </li>
            <li>
              <a className={styles.footerListLink}>Умови повернення</a>
            </li>
            <li>
              <a className={styles.footerListLink}>Про нас</a>
            </li>
          </ul>
          <ul className={styles.navList}>
            <p className={styles.footerListHeader}>Навігація</p>
            <li>
              <a className={styles.footerListLink}>Настільні ігри</a>
            </li>
            <li>
              <a className={styles.footerListLink}>Жанри</a>
            </li>
            <li>
              <a className={styles.footerListLink}>Тематика</a>
            </li>
            <li>
              <a className={styles.footerListLink}>Пазли</a>
            </li>
            <li>
              <a className={styles.footerListLink}>Головоломки</a>
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
                <PhoneIcon />
                <p>+380 98 7067 447</p>
              </a>
            </li>
            <li>
              <a className={styles.footerListLink}>
                <InstagramIcon />
              </a>
              <a className={styles.fbIcon + " " + styles.footerListLink}>
                <FacebookIcon />
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
