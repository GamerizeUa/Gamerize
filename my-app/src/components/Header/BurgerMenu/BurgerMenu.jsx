import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useClickAccount from '@/hooks/useClickAccount.js';
import { fetchAllGenres } from '@/redux/categories/genresSlice.js';
import { fetchAllCategories } from '@/redux/categories/categoriesSlice.js';
import { fetchAllThemes } from '@/redux/categories/themesSlice.js';
import { fetchAllPuzzles } from '@/redux/categories/puzzlesSlice.js';
import { fetchAllMindGames } from '@/redux/categories/mindGamesSlice.js';
import {
    selectCategories,
    selectGenres,
    selectMindGames,
    selectPuzzles,
    selectThemes,
} from '@/redux/selectors.js';
import sprite from '@/assets/icons/sprite.svg';
import HeartIcon from '@/assets/icons/HeartIcon';
import styles from './BurgerMenu.module.css';
import { Logout } from '../../Logout/Logout.jsx';
import {assignIsDisplayedBurgerMenu, assignIsDisplayedLoginPopUp} from '@/redux/formsDisplaying.js';
import useNoScroll from "@/hooks/useNoScroll.js";
import {CategoriesItem} from "@/components/Header/BurgerMenu/CategoriesItem.jsx";

const BurgerMenu = () => {
    const dispatch = useDispatch();
    useNoScroll(true);

    const burgerMenuClose = () => {
        dispatch(assignIsDisplayedBurgerMenu(false))
    }

    const handleOverlayClick = (event) => {
        if (event.currentTarget === event.target) {
            burgerMenuClose();
        }
    };

    const handleClickAccount = useClickAccount(burgerMenuClose);

    const handleCloseBurgerMenu = () => {
        dispatch(assignIsDisplayedLoginPopUp(false));
        burgerMenuClose();
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
                                    href={sprite + '#icon-user'}
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
                                    href={sprite + '#icon-package_search'}
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
                    <CategoriesItem categories={categories} title={'Настільні ігри'} stateName={'categories'} />
                    <CategoriesItem categories={genres} title={'Жанри'} stateName={'genres'}/>
                    <CategoriesItem categories={themes} title={'Тематика'} stateName={'themes'} />
                    <CategoriesItem categories={puzzles} title={'Пазли'} stateName={'puzzles'}/>
                    <CategoriesItem categories={mindGames} title={'Головоломки'} stateName={'mindGames'}/>
                </ul>
                <ul className={styles.menuInfoList}>
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
                    <Logout />
                </div>
            </div>
        </div>
    );
};

export default BurgerMenu;
