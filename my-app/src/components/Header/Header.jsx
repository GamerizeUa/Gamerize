import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import AccountInformation from "./AccountInformation/AccountInformation.jsx";
import { SearchInput } from "../SearchInput/SearchInput";
import { Logo } from "../Logo/Logo";
import { Link } from "react-router-dom";
import useClickAccount from "../hooks/useClickAccount.js";
import sprite from "../../assets/icons/sprite.svg";
import { useSelector } from "react-redux";
import { selectCartProductsCount } from "../../redux/selectors.js";

const Header = ({ openCart, openBurgerMenu, setIsDisplayedLoginPopUp }) => {
  const [accountInformation, setAccountInformation] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleClickAccount = useClickAccount(setIsDisplayedLoginPopUp);
  const cartProductsCount = useSelector(selectCartProductsCount);

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
          {windowWidth < 1280 && (
            <div
              className={styles.burgerMenu}
              onClick={() => {
                openBurgerMenu();
              }}
            >
              <svg width={24} height={24}>
                <use href={sprite + "#icon-burger_menu"} />
              </svg>
            </div>
          )}
          {windowWidth >= 744 && <Logo />}
        </div>
        {windowWidth < 744 && <Logo />}
        <div className={styles.headerInfoBloc}>
          {windowWidth >= 1280 && <SearchInput />}
          <ul className={styles.headerList}>
            {windowWidth >= 744 && (
              <li>
                <a
                  href="tel:+380987067447"
                  rel="noopener noreferrer"
                  className={styles.telLink}
                >
                  <svg width={32} height={32}>
                    <use
                      href={sprite + "#icon-phone"}
                      stroke="currentColor"
                      fill="#AAC4FF"
                    />
                  </svg>
                  <p>+380 98 7067 447</p>
                </a>
              </li>
            )}
            <li
              onClick={() => {
                openCart();
              }}
            >
              <button className={styles.headerButton + " " + styles.cartButton}>
                <svg className={styles.cartIcon}>
                  <use href={sprite + "#icon-cart"} />
                </svg>
                {cartProductsCount > 0 && (
                  <div className={styles.cartCounter}>
                    <span className={styles.cartCounterValue}>
                      {cartProductsCount}
                    </span>
                  </div>
                )}
              </button>
            </li>
            {windowWidth >= 744 && (
              <li
                className={styles.headerListItem}
                onMouseEnter={() => {
                  setTimeout(() => {
                    setAccountInformation(true);
                  }, 300);
                }}
                onMouseLeave={() => {
                  setTimeout(() => {
                    setAccountInformation(false);
                  }, 300);
                }}
              >
                <Link
                  to="/personal-account"
                  className={styles.headerButton}
                  onClick={handleClickAccount}
                >
                  <svg width={32} height={32}>
                    <use
                      href={sprite + "#icon-user"}
                      fill="#AAC4FF"
                      stroke="#EEF1FF"
                    />
                  </svg>
                </Link>
                {accountInformation && (
                  <AccountInformation
                    setIsDisplayedLoginPopUp={setIsDisplayedLoginPopUp}
                  />
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Header;
