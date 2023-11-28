import { useState } from "react";
import Category from "./Category";
import styles from "./CategoryHeader.module.css";
import Genres from "./Genres";

const CategoryHeader = () => {
  const [isCategory, setIsCategory] = useState(false);
  const [isGenre, setIsGenre] = useState(false);

  return (
    <section className={styles.categoryHeaderWrap}>
      <div className={styles.categoryHeader}>
        <ul className={styles.categoryList}>
          <li
            className={styles.categoryListItem}
            onMouseEnter={() => {
              setIsCategory(true);
            }}
            onMouseLeave={() => {
              setIsCategory(false);
            }}
          >
            Настільні ігри
            {isCategory && <Category />}
          </li>
          <li
            className={styles.categoryListItem}
            onMouseEnter={() => {
              setIsGenre(true);
            }}
            onMouseLeave={() => {
              setIsGenre(false);
            }}
          >
            Жанри
            {isGenre && <Genres />}
          </li>
          <li className={styles.categoryListItem}>Тематика</li>
          <li className={styles.categoryListItem}>Пазли</li>
          <li className={styles.categoryListItem}>Головоломки</li>
        </ul>
      </div>
    </section>
  );
};

export default CategoryHeader;
