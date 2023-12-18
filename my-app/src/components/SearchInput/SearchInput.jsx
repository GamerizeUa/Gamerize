import SearchIcon from "../icons/SearchIcon";
import styles from "./SearchInput.module.css";

export const SearchInput = () => {
  return (
    <div className={styles.inputWrapper}>
      <input className={styles.headerSearchInput} placeholder="Пошук"></input>
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
    </div>
  );
};
