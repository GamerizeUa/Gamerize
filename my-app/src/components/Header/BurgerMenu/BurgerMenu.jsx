import CrossIcon from "../../icons/CrossIcon";
import styles from "./BurgerMenu.module.css";
import UserBlueIcon from "../../icons/UserBlueIcon";
import HeartIcon from "../../icons/HeartIcon";
import PackageSearchIcon from "../../icons/PackageSearchIcon";
import ArrowRightSmallIcon from "../../icons/ArrowRightSmallIcon";
import LogOutIcon from "../../icons/LogOutIcon";
import { Link } from "react-router-dom";
import useClickAccount from "../../hooks/useClickAccount.js";
import { useState } from "react";
import { Login } from "../../LoginAndRegistration/Login.jsx";

const BurgerMenu = ({ burgerMenuClose }) => {
  const [isDisplayedLoginPopUp, setIsDisplayedLoginPopUp] = useState(false);
  const handleClickAccount = useClickAccount(
    setIsDisplayedLoginPopUp,
    burgerMenuClose
  );

  const handleOverlayClick = (event) => {
    if (event.currentTarget === event.target) {
      burgerMenuClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleOverlayClick}>
      <div className={styles.burgerMenuWrapper}>
        <div className={styles.burgerMenuHeader}>
          <div className={styles.closeIcon} onClick={burgerMenuClose}>
            <CrossIcon />
          </div>
        </div>
        <ul className={styles.iconsList}>
          <li>
            <Link
              to="/login"
              className={styles.burgerMenuLink}
              onClick={handleClickAccount}
            >
              <UserBlueIcon />
            </Link>
          </li>
          <li>
            <a href="" className={styles.burgerMenuLink}>
              <PackageSearchIcon />
            </a>
          </li>
          <li>
            <a href="" className={styles.burgerMenuLink}>
              <PackageSearchIcon />
            </a>
          </li>
          <li>
            <Link
              to="/favorites"
              className={styles.burgerMenuLink}
              onClick={burgerMenuClose}
            >
              <HeartIcon strokeColor="#AAC4FF" />
            </Link>
          </li>
        </ul>
        <ul className={styles.burgerMenuList}>
          <li className={styles.burgerMenuListItem}>
            <p>Настільні ігри</p>
            <ArrowRightSmallIcon />
          </li>
          <li className={styles.burgerMenuListItem}>
            <p>Жанри</p>
            <ArrowRightSmallIcon />
          </li>
          <li className={styles.burgerMenuListItem}>
            <p>Тематика</p>
            <ArrowRightSmallIcon />
          </li>
          <li className={styles.burgerMenuListItem}>
            <p>Пазли</p>
            <ArrowRightSmallIcon />
          </li>
          <li className={styles.burgerMenuListItem}>
            <p>Головоломки</p>
            <ArrowRightSmallIcon />
          </li>
        </ul>
        <ul className={styles.menuInfoList}>
          <li className={styles.menuInfoListItem}>
            <Link className={styles.menuInfoListLink}>
              Контактна інформація
            </Link>
          </li>
          <li className={styles.menuInfoListItem}>
            <Link className={styles.menuInfoListLink} to="about">
              Про нас
            </Link>
          </li>
          <li className={styles.menuInfoListItem}>
            <Link className={styles.menuInfoListLink}>Оплата та доставка</Link>
          </li>
          <li className={styles.menuInfoListItem}>
            <Link className={styles.menuInfoListLink}>Умови поверненн</Link>я
          </li>
        </ul>
        <div className={styles.logOutBloc}>
          <LogOutIcon />
          <p>Вихід</p>
        </div>
        {isDisplayedLoginPopUp && (
          <Login setDisplayedLoginPopUp={setIsDisplayedLoginPopUp} />
        )}
      </div>
    </div>
  );
};

export default BurgerMenu;
