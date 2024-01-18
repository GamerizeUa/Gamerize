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
import {useNavigate} from "react-router-dom";
import {Login} from "@/components/LoginAndRegistration/Login.jsx";

const Header = ({ openCart, openBurgerMenu }) => {
  const [accountInformation, setAccountInformation] = useState(false);
  const [isDisplayedLoginPopUp, setIsDisplayedLoginPopUp] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const handleChangedSize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleChangedSize);
    return () => {
      window.removeEventListener("resize", handleChangedSize);
    };
  }, []);

  const handleClickAccount = (e) => {
    e.preventDefault();
    const userIdState = localStorage.getItem('userID');
    if (userIdState) {
      navigate('/login');
    } else {
      setIsDisplayedLoginPopUp(true);
    }
  };

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
                <a href="/login" className={styles.headerButton} onClick={handleClickAccount}>
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
          {isDisplayedLoginPopUp && <Login setDisplayedLoginPopUp = {setIsDisplayedLoginPopUp} />}
        </div>
      </div>
    </section>
  );
};

export default Header;
