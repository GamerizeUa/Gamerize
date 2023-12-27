import { useEffect, useState } from "react";
import Categories from "./Categories/Categories";
import styles from "./CategoryHeader.module.css";
import Genres from "./Genres/Genres";
import Themes from "./Themes/Themes";
import { SearchInput } from "../SearchInput/SearchInput";

const CategoryHeader = () => {
  const [isCategory, setIsCategory] = useState(false);
  const [isGenre, setIsGenre] = useState(false);
  const [isTheme, setIsTheme] = useState(false);
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
    <section className={styles.categoryHeaderWrap}>
      <div className={styles.categoryHeader}>
        {windowWidth <= 1280 && <SearchInput />}
        {windowWidth > 1280 && (
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
              {isCategory && <Categories />}
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
            <li
              className={styles.categoryListItem}
              onMouseEnter={() => {
                setIsTheme(true);
              }}
              onMouseLeave={() => {
                setIsTheme(false);
              }}
            >
              Тематика
              {isTheme && <Themes />}
            </li>
            <li className={styles.categoryListItem}>Пазли</li>
            <li className={styles.categoryListItem}>Головоломки</li>
          </ul>
        )}
      </div>
    </section>
  );
};

export default CategoryHeader;
