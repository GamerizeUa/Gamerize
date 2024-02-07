import { useEffect, useState } from "react";
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
        {windowWidth < 1280 && <SearchInput />}
        {windowWidth >= 1280 && (
          <ul className={styles.categoryList}>
            <li
              className={styles.categoryListItem}
              onMouseEnter={() => {
                setTimeout(() => {
                  setIsCategory(true);
                }, 300);
              }}
              onMouseLeave={() => {
                setTimeout(() => {
                  setIsCategory(false);
                }, 300);
              }}
            >
              Настільні ігри
              {isCategory && <Categories />}
            </li>
            <li
              className={styles.categoryListItem}
              onMouseEnter={() => {
                setTimeout(() => {
                  setIsGenre(true);
                }, 300);
              }}
              onMouseLeave={() => {
                setTimeout(() => {
                  setIsGenre(false);
                }, 300);
              }}
            >
              Жанри
              {isGenre && <Genres />}
            </li>
            <li
              className={styles.categoryListItem}
              onMouseEnter={() => {
                setTimeout(() => {
                  setIsTheme(true);
                }, 300);
              }}
              onMouseLeave={() => {
                setTimeout(() => {
                  setIsTheme(false);
                }, 300);
              }}
            >
              Тематика
              {isTheme && <Themes />}
            </li>
            <li
              className={styles.categoryListItem}
              onMouseEnter={() => {
                setTimeout(() => {
                  setIsPuzzle(true);
                }, 300);
              }}
              onMouseLeave={() => {
                setTimeout(() => {
                  setIsPuzzle(false);
                }, 300);
              }}
            >
              Пазли
              {isPuzzle && <Puzzles />}
            </li>
            <li
              className={styles.categoryListItem}
              onMouseEnter={() => {
                setTimeout(() => {
                  setIsBrainTeaser(true);
                }, 300);
              }}
              onMouseLeave={() => {
                setTimeout(() => {
                  setIsBrainTeaser(false);
                }, 300);
              }}
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
