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
              <a>Оплата і доставка</a>
            </li>
            <li>
              <a>Умови повернення</a>
            </li>
          </ul>
          <ul className={styles.navList}>
            <p className={styles.footerListHeader}>Навігація</p>
            <li>
              <a>Настільні ігри</a>
            </li>
            <li>
              <a>Жанри</a>
            </li>
            <li>
              <a>Пазли</a>
            </li>
            <li>
              <a>Головоломки</a>
            </li>
          </ul>
          <ul className={styles.contactsList}>
            <p className={styles.footerListHeader}>Контактна інформація</p>
            <li>
              <a
                href="tel:+380987067447"
                rel="noopener noreferrer"
                className={styles.telLink}
              >
                <PhoneIcon />
                <p>+380 98 7067 447</p>
              </a>
            </li>
            <li>
              <a>
                <InstagramIcon />
              </a>
              <a className={styles.fbIcon}>
                <FacebookIcon />
              </a>
            </li>
          </ul>
        </div>
        <p>© 2023 Gamerise. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
