import { useEffect, useState } from "react";
import ShoppingCartIcon from "../icons/CartIcon";
import HeartIcon from "../icons/HeartIcon";
import PhoneIcon from "../icons/PhoneIcon";
import UserIcon from "../icons/UserIcon";
import styles from "./Header.module.css";
import AccountInformation from "./AccountInformation";
import { SearchInput } from "../SearchInput/SearchInput";
import { Logo } from "../Logo/Logo";
import BurgerMenuIcon from "../icons/BurgerMenuIcon";

const Header = ({ openCart, openBurgerMenu }) => {
  const [accountInformation, setAccountInformation] = useState(false);
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
    <section className={styles.headerSection}>
      <div className={styles.header}>
        <div className={styles.logoWrapper}>
          {windowWidth <= 1280 && (
            <div
              className={styles.burgerMenu}
              onClick={() => {
                openBurgerMenu();
              }}
            >
              <BurgerMenuIcon />
            </div>
          )}
          {windowWidth >= 744 && <Logo />}
        </div>
        {windowWidth < 744 && <Logo />}
        <div className={styles.headerInfoBlock}>
          {windowWidth >= 1280 && <SearchInput />}
          <ul className={styles.headerList}>
            {windowWidth >= 744 && (
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
            )}
            <li
              onClick={() => {
                openCart();
              }}
            >
              <button className={styles.headerButton}>
                <ShoppingCartIcon />
              </button>
            </li>
            {windowWidth >= 744 && (
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
            )}
            {windowWidth >= 744 && (
              <li>
                <a href="/favorites" className={styles.headerButton}>
                  <HeartIcon />
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Header;
