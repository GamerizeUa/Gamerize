import ShoppingCartIcon from "../icons/CartIcon";
import HeartIcon from "../icons/HeartIcon";
import PhoneIcon from "../icons/PhoneIcon";
import SearchIcon from "../icons/SearchIcon";
import UserIcon from "../icons/UserIcon";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.logo}>Gamerise</h1>
      <div className={styles.inputWrapper}>
        <input className={styles.headerSearchInput} placeholder="Пошук"></input>
        <div className={styles.searchIcon}>
          <SearchIcon />
        </div>
      </div>
      <ul className={styles.headerList}>
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
          <button className={styles.headerButton}>
            <ShoppingCartIcon />
          </button>
        </li>
        <li>
          <button className={styles.headerButton}>
            <UserIcon />
          </button>
        </li>
        <li>
          <button className={styles.headerButton}>
            <HeartIcon />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
