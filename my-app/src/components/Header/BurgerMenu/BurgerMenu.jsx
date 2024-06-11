import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useClickAccount from "../../hooks/useClickAccount.js";
import { fetchAllGenres } from "../../../redux/categories/genresSlice.js";
import { fetchAllCategories } from "../../../redux/categories/categoriesSlice.js";
import { fetchAllThemes } from "../../../redux/categories/themesSlice.js";
import { fetchAllPuzzles } from "../../../redux/categories/puzzlesSlice.js";
import { fetchAllMindGames } from "../../../redux/categories/mindGamesSlice.js";
import {
  selectCategories,
  selectGenres,
  selectMindGames,
  selectPuzzles,
  selectThemes,
} from "../../../redux/selectors.js";
import sprite from "../../../assets/icons/sprite.svg";
import HeartIcon from "../../icons/HeartIcon";
import styles from "./BurgerMenu.module.css";
import {Logout} from "../../Logout/Logout.jsx";

const BurgerMenu = ({ burgerMenuClose, setIsDisplayedLoginPopUp }) => {
  const [isCategory, setIsCategory] = useState(false);
  const [isGenre, setIsGenre] = useState(false);
  const [isTheme, setIsTheme] = useState(false);
  const [isPuzzle, setIsPuzzle] = useState(false);
  const [isMindGames, setIsMindGames] = useState(false);
  const dispatch = useDispatch();

  const handleOverlayClick = (event) => {
    if (event.currentTarget === event.target) {
      burgerMenuClose();
    }
  };

  const handleClickAccount = useClickAccount(
      setIsDisplayedLoginPopUp,
      burgerMenuClose
  );

  const handleCloseBurgerMenu = () => {
    setIsDisplayedLoginPopUp(false);
    burgerMenuClose();
  };

  const toggleClick = (setter) => {
    setter((prevState) => !prevState);
  };

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
    <div className={styles.backdrop} onClick={handleOverlayClick}>
      <div className={styles.burgerMenuWrapper}>
        <div className={styles.burgerMenuHeader}>
          <div className={styles.closeIcon} onClick={burgerMenuClose}>
            <svg width="24" height="24">
              <use
                href={sprite + `#icon-cross`}
                stroke="white"
                strokeWidth={2}
              ></use>
            </svg>
          </div>
        </div>
        <ul className={styles.iconsList}>
          <li>
            <Link
              to="/personal-account"
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
          <li
            className={styles.burgerMenuListItem}
            onClick={() => toggleClick(setIsCategory)}
          >
            <p>Настільні ігри</p>
            <svg width="24" height="24">
              <use
                href={
                  isCategory
                    ? sprite + `#icon-chevron-up`
                    : sprite + `#icon-chevron-right`
                }
                fill="white"
                stroke="#AAC4FF"
              ></use>
            </svg>
          </li>
          <li>
            {isCategory && (
              <ul className={styles.categoryList}>
                {categories.map((category) => (
                  <li key={category.id} className={styles.categoryListItem}>
                    <Link
                      to="/catalog"
                      state={{ categories: category.name }}
                      className={styles.categoryListLink}
                      onClick={() => burgerMenuClose()}
                    >
                      <p>{category.name}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li
            className={styles.burgerMenuListItem}
            onClick={() => toggleClick(setIsGenre)}
          >
            <p>Жанри</p>
            <svg width="24" height="24">
              <use
                href={
                  isGenre
                    ? sprite + `#icon-chevron-up`
                    : sprite + `#icon-chevron-right`
                }
                fill="white"
                stroke="#AAC4FF"
              ></use>
            </svg>
          </li>
          <li>
            {isGenre && (
              <ul className={styles.categoryList}>
                {genres.map((genre) => (
                  <li key={genre.id} className={styles.categoryListItem}>
                    <Link
                      to="/catalog"
                      state={{ genres: genre.name }}
                      className={styles.categoryListLink}
                      onClick={() => burgerMenuClose()}
                    >
                      <p>{genre.name}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li
            className={styles.burgerMenuListItem}
            onClick={() => toggleClick(setIsTheme)}
          >
            <p>Тематика</p>
            <svg width="24" height="24">
              <use
                href={
                  isTheme
                    ? sprite + `#icon-chevron-up`
                    : sprite + `#icon-chevron-right`
                }
                fill="white"
                stroke="#AAC4FF"
              ></use>
            </svg>
          </li>
          <li>
            {isTheme && (
              <ul className={styles.categoryList}>
                {themes.map((theme) => (
                  <li key={theme.id} className={styles.categoryListItem}>
                    <Link
                      to="/catalog"
                      state={{ themes: theme.name }}
                      className={styles.categoryListLink}
                      onClick={() => burgerMenuClose()}
                    >
                      <p>{theme.name}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li
            className={styles.burgerMenuListItem}
            onClick={() => toggleClick(setIsPuzzle)}
          >
            <p>Пазли</p>
            <svg width="24" height="24">
              <use
                href={
                  isPuzzle
                    ? sprite + `#icon-chevron-up`
                    : sprite + `#icon-chevron-right`
                }
                fill="white"
                stroke="#AAC4FF"
              ></use>
            </svg>
          </li>
          <li>
            {isPuzzle && (
              <ul className={styles.categoryList}>
                {puzzles.map((puzzle) => (
                  <li key={puzzle.id} className={styles.categoryListItem}>
                    <Link
                      to="/catalog"
                      state={{ puzzles: puzzle.name }}
                      className={styles.categoryListLink}
                      onClick={() => burgerMenuClose()}
                    >
                      <p>{puzzle.name}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li
            className={styles.burgerMenuListItem}
            onClick={() => toggleClick(setIsMindGames)}
          >
            <p>Головоломки</p>
            <svg width="24" height="24">
              <use
                href={
                  isMindGames
                    ? sprite + `#icon-chevron-up`
                    : sprite + `#icon-chevron-right`
                }
                fill="white"
                stroke="#AAC4FF"
              ></use>
            </svg>
          </li>
          <li>
            {isMindGames && (
              <ul className={styles.categoryList}>
                {mindGames.map((game) => (
                  <li key={game.id} className={styles.categoryListItem}>
                    <Link
                      to="/catalog"
                      state={{ mindGames: game.name }}
                      className={styles.categoryListLink}
                      onClick={() => burgerMenuClose()}
                    >
                      <p>{game.name}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
        <ul className={styles.menuInfoList}>
          <li className={styles.menuInfoListItem}>
            <Link className={styles.menuInfoListLink}>
              Контактна інформація
            </Link>
          </li>
          <li className={styles.menuInfoListItem}>
            <Link
              className={styles.menuInfoListLink}
              to="about"
              onClick={() => burgerMenuClose()}
            >
              Про нас
            </Link>
          </li>
          <li className={styles.menuInfoListItem}>
            <Link
              className={styles.menuInfoListLink}
              to="order-pay"
              onClick={() => burgerMenuClose()}
            >
              Оплата та доставка
            </Link>
          </li>
          <li className={styles.menuInfoListItem}>
            <Link
              className={styles.menuInfoListLink}
              to="return"
              onClick={() => burgerMenuClose()}
            >
              Умови повернення
            </Link>
            я
          </li>
        </ul>
        <div className={styles.logOutBloc}>
          <Logout setIsDisplayedLoginPopUp={setIsDisplayedLoginPopUp}/>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
