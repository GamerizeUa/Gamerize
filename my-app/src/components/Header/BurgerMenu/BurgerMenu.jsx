import CrossIcon from "../../icons/CrossIcon";
import styles from "./BurgerMenu.module.css";
import UserBlueIcon from "../../icons/UserBlueIcon";
import HeartBlueIcon from "../../icons/HeartBlueIcon";
import PackageSearchIcon from "../../icons/PackageSearchIcon";
import ArrowRightSmallIcon from "../../icons/ArrowRightSmallIcon";
import LogOutIcon from "../../icons/LogOutIcon";

const BurgerMenu = ({ burgerMenuClose }) => {
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
            <a href="/login" className={styles.burgerMenuLink}>
              <UserBlueIcon />
            </a>
          </li>
          <li>
            <a href="" className={styles.burgerMenuLink}>
              <PackageSearchIcon />
            </a>
          </li>
          <li>
            <a href="/favorites" className={styles.burgerMenuLink}>
              <HeartBlueIcon />
            </a>
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
            <a>Контактна інформація</a>
          </li>
          <li className={styles.menuInfoListItem}>
            <a>Про нас</a>
          </li>
          <li className={styles.menuInfoListItem}>
            <a>Оплата та доставка</a>
          </li>
          <li className={styles.menuInfoListItem}>
            <a>Умови поверненн</a>я
          </li>
        </ul>
        <div className={styles.logOutBloc}>
          <LogOutIcon />
          <p>Вихід</p>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
