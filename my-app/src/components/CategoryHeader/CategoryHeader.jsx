import { useEffect, useState, useRef } from "react";
import Categories from "./Categories/Categories";
import styles from "./CategoryHeader.module.css";
import Genres from "./Genres/Genres";
import Themes from "./Themes/Themes";
import { SearchInput } from "../SearchInput/SearchInput";
import Puzzles from "./Puzzles/Puzzles";
import BrainTeasers from "./BrainTeasers/BrainTeasers";

const CategoryHeader = () => {
  const [isCategory, setIsCategory] = useState(false);
  const [isGenre, setIsGenre] = useState(false);
  const [isTheme, setIsTheme] = useState(false);
  const [isPuzzle, setIsPuzzle] = useState(false);
  const [isBrainTeaser, setIsBrainTeaser] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const timeoutRef = useRef(null);

  const handleChangedSize = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleMouseEnter = (setter) => {
    timeoutRef.current = setTimeout(() => {
      setter(true);
    }, 300);
  };

  const handleMouseLeave = (setter) => {
    clearTimeout(timeoutRef.current);
    setter(false);
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
        {windowWidth < 1280 && <SearchInput />}
        {windowWidth >= 1280 && (
          <ul className={styles.categoryList}>
            <li
              className={styles.categoryListItem}
              onMouseEnter={() => handleMouseEnter(setIsCategory)}
              onMouseLeave={() => handleMouseLeave(setIsCategory)}
            >
              Настільні ігри
              {isCategory && <Categories />}
            </li>
            <li
              className={styles.categoryListItem}
              onMouseEnter={() => handleMouseEnter(setIsGenre)}
              onMouseLeave={() => handleMouseLeave(setIsGenre)}
            >
              Жанри
              {isGenre && <Genres />}
            </li>
            <li
              className={styles.categoryListItem}
              onMouseEnter={() => handleMouseEnter(setIsTheme)}
              onMouseLeave={() => handleMouseLeave(setIsTheme)}
            >
              Тематика
              {isTheme && <Themes />}
            </li>
            <li
              className={styles.categoryListItem}
              onMouseEnter={() => handleMouseEnter(setIsPuzzle)}
              onMouseLeave={() => handleMouseLeave(setIsPuzzle)}
            >
              Пазли
              {isPuzzle && <Puzzles />}
            </li>
            <li
              className={styles.categoryListItem}
              onMouseEnter={() => handleMouseEnter(setIsBrainTeaser)}
              onMouseLeave={() => handleMouseLeave(setIsBrainTeaser)}
            >
              Головоломки
              {isBrainTeaser && <BrainTeasers />}
            </li>
          </ul>
        )}
      </div>
    </section>
  );
};

export default CategoryHeader;
