import styles from './CatalogFilters.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownFilters } from './DropdownFilters.jsx';
import {PriceFilter} from "./PriceFilter.jsx";
import {
    selectCategories,
    selectGenres,
    selectThemes,
    selectPuzzles,
    selectMindGames,
    selectLanguages,
} from '@/redux/selectors.js';
import { setFilters } from '@/redux/productsCatalogSlice.js';
import handleLinkClick from '@/utils/ScrollToTop.js';

export const CatalogFilters = ({ openFiltersFunc, setGlobalReset }) => {
    const age = ['3 - 6', '6 - 9', '9 - 12', '12 - 18', '18+'];
    const players = ['1 - 3', '4 - 6', 'більше 6'];
    const timeGame = ['15 - 30', '40 - 60', '70 - 90', '115 - 180', '240'];
    const [chosenFilters, setChosenFilters] = useState({
        'categories': [],
        'genres': [],
        'themes': [],
        'puzzles': [],
        'mindGames': [],
        'ages': [],
        'playersAmount': [],
        'gameTime': [],
        'languages': [],
        'price': [{ min: 0, max: 0 }],
    });
    const [isReadyForResetting, setIsReadyForResetting] = useState(false);
    const { filters } = useSelector((state) => state.productsCatalog);
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const genres = useSelector(selectGenres);
    const themes = useSelector(selectThemes);
    const puzzles = useSelector(selectPuzzles);
    const mindGames = useSelector(selectMindGames);
    const languages = useSelector(selectLanguages);

    useEffect(() => {
        if (isReadyForResetting) {
            getSelectedFilters();
        }
        setIsReadyForResetting(false);
    }, [isReadyForResetting]);

    useEffect(() => {
        setChosenFilters({ ...filters});
    }, [filters]);

    const getSelectedFilters = () => {
        dispatch(setFilters(chosenFilters));
        if (openFiltersFunc) {
            openFiltersFunc(false);
        }
        setGlobalReset(true);
    };

    const handleResetFilters = () => {
        setChosenFilters({
            categories: [],
            genres: [],
            themes: [],
            puzzles: [],
            mindGames: [],
            ages: [],
            playersAmount: [],
            gameTime: [],
            languages: [],
            price: [{ min: 0, max: 0 }],
        });
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
        const inputsText = document.querySelectorAll('input[type="text"]');
        inputsText.forEach((element) => {
            element.value = '';
        });
        setIsReadyForResetting(true);
    };

    const updateFilter = (filterName, newValues) => {
        setChosenFilters(prev => ({ ...prev, [filterName]: newValues }));
    };

    return (
        <div className={styles.filters}>
            <p className={styles.filters_title}>Фільтри</p>
            <DropdownFilters
                title={'Категорія'}
                categories={categories}
                selectedCategories={chosenFilters.categories}
                updateSelectedCategories={(newCategories) => updateFilter('categories', newCategories)}
            ></DropdownFilters>
            <DropdownFilters
                title={'Жанри'}
                categories={genres}
                selectedCategories={chosenFilters.genres}
                updateSelectedCategories={(newGenres) => updateFilter('genres', newGenres)}
            ></DropdownFilters>
            <DropdownFilters
                title={'Тематика'}
                categories={themes}
                selectedCategories={chosenFilters.themes}
                updateSelectedCategories={(newThemes) => updateFilter('themes', newThemes)}
            ></DropdownFilters>
            <DropdownFilters
                title={'Пазли'}
                categories={puzzles}
                selectedCategories={chosenFilters.puzzles}
                updateSelectedCategories={(newPuzzles) => updateFilter('puzzles', newPuzzles)}
            ></DropdownFilters>
            <DropdownFilters
                title={'Головоломки'}
                categories={mindGames}
                selectedCategories={chosenFilters.mindGames}
                updateSelectedCategories={(newMindGames) => updateFilter('mindGames', newMindGames)}
            ></DropdownFilters>
            <PriceFilter
                setPriceRange={setChosenFilters}
            />
            <DropdownFilters
                title={'Вік'}
                categories={age}
                selectedCategories={chosenFilters.ages}
                updateSelectedCategories={(newAges) => updateFilter('ages', newAges)}
            ></DropdownFilters>
            <DropdownFilters
                title={'Кількість гравців'}
                categories={players}
                selectedCategories={chosenFilters.playersAmount}
                updateSelectedCategories={(newPlayers) => updateFilter('playersAmount', newPlayers)}
            ></DropdownFilters>
            <DropdownFilters
                title={'Час гри'}
                categories={timeGame}
                selectedCategories={chosenFilters.gameTime}
                updateSelectedCategories={(newGameTime) => updateFilter('gameTime', newGameTime)}
            ></DropdownFilters>
            <DropdownFilters
                title={'Мова'}
                categories={languages}
                selectedCategories={chosenFilters.languages}
                updateSelectedCategories={(newLanguages) => updateFilter('languages', newLanguages)}
            ></DropdownFilters>
            <div className={styles.filters_buttons} onClick={handleLinkClick}>
                <button
                    className={styles.button_apply}
                    type="submit"
                    onClick={() => {
                        getSelectedFilters();
                    }}
                >
                    Застосувати
                </button>
                <button
                    className={styles.button_reset}
                    onClick={handleResetFilters}
                >
                    Скинути фільтри
                </button>
            </div>
        </div>
    );
};
