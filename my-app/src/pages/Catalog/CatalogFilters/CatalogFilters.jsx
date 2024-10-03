import styles from './CatalogFilters.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownFilters } from './DropdownFilters.jsx';
import {
    selectCategories,
    selectGenres,
    selectThemes,
    selectPuzzles,
    selectMindGames,
    selectLanguages,
} from '@/redux/selectors.js';
import { useLocation } from 'react-router-dom';
import { setFilters } from '@/redux/productsCatalogSlice.js';
import handleLinkClick from '@/utils/ScrollToTop.js';
import useWindowWidth from '@/hooks/useWindowWidth.js';
import {PriceFilter} from "@/pages/Catalog/CatalogFilters/PriceFilter.jsx";

export const CatalogFilters = ({ openFiltersFunc }) => {
    const age = ['3 - 6', '6 - 9', '9 - 12', '12 - 18', '18+'];
    const players = ['1 - 3', '4 - 6', 'більше 6'];
    const timeGame = ['15 - 30', '40 - 60', '70 - 90', '115 - 180', '240'];
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedThemes, setSelectedThemes] = useState([]);
    const [selectedPuzzles, setSelectedPuzzles] = useState([]);
    const [selectedMindGames, setSelectedMindGames] = useState([]);
    const [priceRange, setPriceRange] = useState([{ min: 0, max: 0 }]);
    const [selectedAges, setSelectedAges] = useState([]);
    const [selectedPlayersAmount, setSelectedPlayersAmount] = useState([]);
    const [selectedGameTimes, setSelectedGameTimes] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [isReadyForResetting, setIsReadyForResetting] = useState(false);
    const windowWidth = useWindowWidth();
    const { filters } = useSelector((state) => state.productsCatalog);
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const genres = useSelector(selectGenres);
    const themes = useSelector(selectThemes);
    const puzzles = useSelector(selectPuzzles);
    const mindGames = useSelector(selectMindGames);
    const languages = useSelector(selectLanguages);
    const location = useLocation();

    useEffect(() => {
        if (isReadyForResetting) {
            getSelectedFilters();
            setIsReadyForResetting(!isReadyForResetting);
        }
    }, [isReadyForResetting]);

    const processState = (stateObject) => {
        if (stateObject) {
            Object.keys(stateObject).forEach((key) => {
                const setterFunction = getSetterFunction(key);
                if (setterFunction && stateObject[key]) {
                    setterFunction((prevState) => [
                        ...prevState,
                        ...(Array.isArray(stateObject[key])
                            ? stateObject[key]
                                  .map((item) => {
                                      if (
                                          typeof item === 'object' &&
                                          item !== null
                                      ) {
                                          return item;
                                      }
                                      return item && Number(item);
                                  })
                                  .filter(
                                      (item) =>
                                          item !== null &&
                                          item !== '' &&
                                          item !== undefined
                                  )
                            : [stateObject[key]]),
                    ]);
                    setterFunction((prevState) => [...new Set(prevState)]);
                }
            });
        }
    };

    useEffect(() => {
        if (windowWidth < 1280) {
            processState(filters);
            setIsReadyForResetting(true);
        }
    }, [filters]);

    useEffect(() => {
        if (location.state) {
            processState(location.state);
            setIsReadyForResetting(true);
        }
    }, [location.state]);

    const getSetterFunction = (key) => {
        switch (key) {
            case 'categories':
                return setSelectedCategories;
            case 'genres':
                return setSelectedGenres;
            case 'themes':
                return setSelectedThemes;
            case 'puzzles':
                return setSelectedPuzzles;
            case 'mindGames':
                return setSelectedMindGames;
            case 'ages':
                return setSelectedAges;
            case 'gameTimes':
                return setSelectedGameTimes;
            case 'playersAmount':
                return setSelectedPlayersAmount;
            default:
                return null;
        }
    };

    const getSelectedFilters = () => {
        const filters = {
            categories: selectedCategories,
            genres: selectedGenres,
            themes: selectedThemes,
            puzzles: selectedPuzzles,
            mindGames: selectedMindGames,
            price: priceRange,
            ages: selectedAges,
            playersAmount: selectedPlayersAmount,
            gameTime: selectedGameTimes,
            languages: selectedLanguages,
        };
        dispatch(setFilters(filters));
    };

    const handleResetFilters = () => {
        setSelectedCategories([]);
        setSelectedGenres([]);
        setSelectedThemes([]);
        setSelectedPuzzles([]);
        setSelectedMindGames([]);
        setPriceRange([{ min: 0, max: 0 }]);
        setSelectedAges([]);
        setSelectedPlayersAmount([]);
        setSelectedGameTimes([]);
        setSelectedLanguages([]);
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

    return (
        <div className={styles.filters}>
            <p className={styles.filters_title}>Фільтри</p>
            <DropdownFilters
                title={'Категорія'}
                categories={categories}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
            ></DropdownFilters>
            <DropdownFilters
                title={'Жанри'}
                categories={genres}
                selectedCategories={selectedGenres}
                setSelectedCategories={setSelectedGenres}
            ></DropdownFilters>
            <DropdownFilters
                title={'Тематика'}
                categories={themes}
                selectedCategories={selectedThemes}
                setSelectedCategories={setSelectedThemes}
            ></DropdownFilters>
            <DropdownFilters
                title={'Пазли'}
                categories={puzzles}
                selectedCategories={selectedPuzzles}
                setSelectedCategories={setSelectedPuzzles}
            ></DropdownFilters>
            <DropdownFilters
                title={'Головоломки'}
                categories={mindGames}
                selectedCategories={selectedMindGames}
                setSelectedCategories={setSelectedMindGames}
            ></DropdownFilters>
            <PriceFilter setPriceRange={setPriceRange}/>
            <DropdownFilters
                title={'Вік'}
                categories={age}
                selectedCategories={selectedAges}
                setSelectedCategories={setSelectedAges}
            ></DropdownFilters>
            <DropdownFilters
                title={'Кількість гравців'}
                categories={players}
                selectedCategories={selectedPlayersAmount}
                setSelectedCategories={setSelectedPlayersAmount}
            ></DropdownFilters>
            <DropdownFilters
                title={'Час гри'}
                categories={timeGame}
                selectedCategories={selectedGameTimes}
                setSelectedCategories={setSelectedGameTimes}
            ></DropdownFilters>
            <DropdownFilters
                title={'Мова'}
                categories={languages}
                selectedCategories={selectedLanguages}
                setSelectedCategories={setSelectedLanguages}
            ></DropdownFilters>
            <div className={styles.filters_buttons} onClick={handleLinkClick}>
                <button
                    className={styles.button_apply}
                    type="submit"
                    onClick={() => {
                        getSelectedFilters();
                        if (openFiltersFunc) {
                            openFiltersFunc(false);
                        }
                    }}
                >
                    Застосувати
                </button>
                <button
                    className={styles.button_reset}
                    onClick={() => {
                        handleResetFilters();
                    }}
                >
                    Скинути фільтри
                </button>
            </div>
        </div>
    );
};
