import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllGenres } from "../../redux/categories/genresSlice";
import Categories from "./Categories/Categories";
import styles from "./CategoryHeader.module.css";
import Genres from "./Genres/Genres";
import Themes from "./Themes/Themes";
import { SearchInput } from "../SearchInput/SearchInput";
import Puzzles from "./Puzzles/Puzzles";
import MindGames from "./MindGames/MindGames";
import {
  selectCategories,
  selectGenres,
  selectMindGames,
  selectPuzzles,
  selectThemes,
} from "../../redux/selectors";
import { fetchAllCategories } from "../../redux/categories/categoriesSlice";
import { fetchAllThemes } from "../../redux/categories/themesSlice";
import { fetchAllPuzzles } from "../../redux/categories/puzzlesSlice";
import { fetchAllMindGames } from "../../redux/categories/mindGamesSlice";

const CategoryHeader = () => {
  const [isCategory, setIsCategory] = useState(false);
  const [isGenre, setIsGenre] = useState(false);
  const [isTheme, setIsTheme] = useState(false);
  const [isPuzzle, setIsPuzzle] = useState(false);
  const [isMindGames, setIsMindGames] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const timeoutRef = useRef(null);
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(fetchAllGenres());
    dispatch(fetchAllCategories());
    dispatch(fetchAllThemes());
    dispatch(fetchAllPuzzles());
    dispatch(fetchAllMindGames());
  }, [dispatch]);

  const categories = useSelector(selectCategories);
  const genres = useSelector(selectGenres);
  const themes = useSelector(selectThemes);
  const puzzles = useSelector(selectPuzzles);
  const mindGames = useSelector(selectMindGames);

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
              {isCategory && <Categories categories={categories} />}
            </li>
            <li
              className={styles.categoryListItem}
              onMouseEnter={() => handleMouseEnter(setIsGenre)}
              onMouseLeave={() => handleMouseLeave(setIsGenre)}
            >
              Жанри
              {isGenre && <Genres genres={genres} />}
            </li>
            <li
              className={styles.categoryListItem}
              onMouseEnter={() => handleMouseEnter(setIsTheme)}
              onMouseLeave={() => handleMouseLeave(setIsTheme)}
            >
              Тематика
              {isTheme && <Themes themes={themes} />}
            </li>
            <li
              className={styles.categoryListItem}
              onMouseEnter={() => handleMouseEnter(setIsPuzzle)}
              onMouseLeave={() => handleMouseLeave(setIsPuzzle)}
            >
              Пазли
              {isPuzzle && <Puzzles puzzles={puzzles} />}
            </li>
            <li
              className={styles.categoryListItem}
              onMouseEnter={() => handleMouseEnter(setIsMindGames)}
              onMouseLeave={() => handleMouseLeave(setIsMindGames)}
            >
              Головоломки
              {isMindGames && <MindGames mindGames={mindGames} />}
            </li>
          </ul>
        )}
      </div>
    </section>
  );
};

export default CategoryHeader;
