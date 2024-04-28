import styles from "./SearchInput.module.css";
import sprite from "../../assets/icons/sprite.svg";

export const SearchInput = () => {
  return (
    <div className={styles.inputWrapper}>
      <input className={styles.headerSearchInput} placeholder="Пошук"></input>
      <div className={styles.searchIcon}>
        <svg>
          <use href={sprite + "#icon-search"} fill="#FFFFFF" stroke="#2B2B2B" />
        </svg>
      </div>
    </div>
  );
};
