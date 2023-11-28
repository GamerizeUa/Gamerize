import { useState } from "react";
import ShoppingCartIcon from "../icons/CartIcon";
import HeartIcon from "../icons/HeartIcon";
import PhoneIcon from "../icons/PhoneIcon";
import SearchIcon from "../icons/SearchIcon";
import UserIcon from "../icons/UserIcon";
import styles from "./Header.module.css";
import AccountInformation from "./AccountInformation";

const Header = ({ openCart }) => {
  const [accountInformation, setAccountInformation] = useState(false);

  return (
    <section className={styles.header}>
      <a href="/">
        <h1 className={styles.logo}>Gamerise</h1>
      </a>
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
        <li
          onClick={() => {
            openCart();
          }}
        >
          <button className={styles.headerButton}>
            <ShoppingCartIcon />
          </button>
        </li>
        <li
          className={styles.headerListItem}
          onMouseEnter={() => {
            setAccountInformation(true);
          }}
          onMouseLeave={() => {
            setAccountInformation(false);
          }}
        >
          <a href="/login" className={styles.headerButton}>
            <UserIcon />
          </a>
          {accountInformation && <AccountInformation />}
        </li>
        <li>
          <a href="/favorites" className={styles.headerButton}>
            <HeartIcon />
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Header;
