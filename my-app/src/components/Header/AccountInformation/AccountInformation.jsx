import { Link } from "react-router-dom";
import styles from "./AccountInformation.module.css";
import sprite from "../../../assets/icons/sprite.svg";
import HeartIcon from "../../icons/HeartIcon";

const AccountInformation = () => {
  return (
    <div className={styles.accountLinksWrapper}>
      <ul className={styles.accountList}>
        <li className={styles.accountListItem}>
          <Link to="/login" className={styles.accountLink}>
            <div>
              <svg width="24" height="24">
                <use href={sprite + "#icon-settings"}></use>
              </svg>
            </div>
            <p className={styles.accountLinkText}>Особисті дані</p>
          </Link>
        </li>
        <li className={styles.accountListItem}>
          <Link to="/order/history" className={styles.accountLink}>
            <div>
              <svg width="24" height="24">
                <use href={sprite + "#icon-shopping-bag"}></use>
              </svg>
            </div>
            <p className={styles.accountLinkText}>Історія замовлень</p>
          </Link>
        </li>
        <li className={styles.accountListItem}>
          <Link to="/favorites" className={styles.accountLink}>
            <div>
              <HeartIcon strokeColor="#AAC4FF" />
            </div>
            <p className={styles.accountLinkText}>Список бажань</p>
          </Link>
        </li>
      </ul>
      <div className={styles.accountlogOut}>
        <Link className={styles.logOutLink}>
          <svg width="24" height="24">
            <use href={sprite + "#icon-log-out"}></use>
          </svg>
          <p className={styles.accountLinkText}>Вихід</p>
        </Link>
      </div>
    </div>
  );
};

export default AccountInformation;
