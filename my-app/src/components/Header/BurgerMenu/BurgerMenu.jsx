import CrossIcon from "../../icons/CrossIcon";
import styles from "./BurgerMenu.module.css";
import HeartIcon from "../../icons/HeartIcon";
import { Link } from "react-router-dom";
import useClickAccount from "../../hooks/useClickAccount.js";
import { useState } from "react";
import { Login } from "../../LoginAndRegistration/Login.jsx";
import sprite from "../../../assets/icons/sprite.svg";
import ArrowRightIcon from "../../icons/ArrowRightIcon.jsx";

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

  const handleCloseBurgerMenu = () => {
    setIsDisplayedLoginPopUp(false);
    burgerMenuClose();
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
              <svg width={32} height={32}>
                <use
                  href={sprite + "#icon-user"}
                  fill="#FFFFFF"
                  stroke="#AAC4FF"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link
              to="/order/history"
              className={styles.burgerMenuLink}
              onClick={() => handleCloseBurgerMenu()}
            >
              <svg width="34" height="34">
                <use
                  href={sprite + "#icon-package_search"}
                  fill="#EEF1FF"
                ></use>
              </svg>
            </Link>
          </li>
          <li>
            <Link
              to="/wish-list"
              className={styles.burgerMenuLink}
              onClick={() => handleCloseBurgerMenu()}
            >
              <HeartIcon strokeColor="#AAC4FF" />
            </Link>
          </li>
        </ul>
        <ul className={styles.burgerMenuList}>
          <li className={styles.burgerMenuListItem}>
            <p>Настільні ігри</p>
            <ArrowRightIcon color="#AAC4FF" strokeWidth="5" />
          </li>
          <li className={styles.burgerMenuListItem}>
            <p>Жанри</p>
            <ArrowRightIcon color="#AAC4FF" strokeWidth="5" />
          </li>
          <li className={styles.burgerMenuListItem}>
            <p>Тематика</p>
            <ArrowRightIcon color="#AAC4FF" strokeWidth="5" />
          </li>
          <li className={styles.burgerMenuListItem}>
            <p>Пазли</p>
            <ArrowRightIcon color="#AAC4FF" strokeWidth="5" />
          </li>
          <li className={styles.burgerMenuListItem}>
            <p>Головоломки</p>
            <ArrowRightIcon color="#AAC4FF" strokeWidth="5" />
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
          <svg width="24" height="24">
            <use href={sprite + "#icon-log-out"}></use>
          </svg>
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
