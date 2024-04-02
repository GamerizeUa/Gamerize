import styles from "./CatalogFilters.module.css";
import CheckIcon from "../../icons/CheckIcon.jsx";
import {filterProducts} from './filters.js';
import React, {useEffect, useState} from "react";
import {arrayProducts} from '../../../pages/Catalog/test.js';
import {setProductsCatalog} from "../../../redux/productsCatalogSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {DropdownFilters} from "./DropdownFilters.jsx";
import {selectCategories, selectGenres, selectThemes} from "../../../redux/selectors.js";
import {useLocation} from "react-router-dom";

export  const CatalogFilters = () => {
    const age = ["3 - 6", "6 - 9", "9 - 12", "12 - 18", "18+"];
    const players = ["1 - 3", "4 - 6", "більше 6"];
    const timeGame = ["15 - 30", "40 - 60", "70 - 90", "115 - 180", "240"];
    const languages = ["Українська", "Англійська", "Іспанська"];
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedThemes, setSelectedThemes] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [selectedAges, setSelectedAges] = useState([]);
    const [selectedPlayersAmount, setSelectedPlayersAmount] = useState([]);
    const [selectedGameTimes, setSelectedGameTimes] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [isReadyForResetting, setIsReadyForResetting] = useState(false);
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const genres = useSelector(selectGenres);
    const themes = useSelector(selectThemes);
    const location = useLocation();


    const handlePriceInputChange = (event, type) => {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
        setPriceRange((prevRange) => ({
            ...prevRange,
            [type]: event.target.value ,
        }));
    };

    useEffect(() => {
        if(isReadyForResetting){
            getSelectedFilters();
            setIsReadyForResetting(!isReadyForResetting)
        }
    }, [isReadyForResetting])

    useEffect(() => {
        if (location.state) {
            Object.keys(location.state).forEach(key => {
                const setterFunction = getSetterFunction(key);
                if (setterFunction) {
                    setterFunction(prevState => [...prevState, location.state[key]]);
                }
            });
            setIsReadyForResetting(true);
        }},[location.state])

    const getSetterFunction = (key) => {
        switch (key) {
            case 'category':
                return setSelectedCategories;
            case 'genre':
                return setSelectedGenres;
            case 'theme':
                return setSelectedThemes;
            case 'age':
                return setSelectedAges;
            case 'gameTime':
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
            price: priceRange,
            ages: selectedAges,
            playersAmount: selectedPlayersAmount,
            gameTimes: selectedGameTimes,
            languages: selectedLanguages,
        };
        const products = arrayProducts();
        const result = filterProducts(products,filters);
        dispatch(setProductsCatalog(result));
    };

    const handleCheckBoxChange = (item, arrayFunc) => {
        arrayFunc((prevItems) =>
            prevItems.includes(item)
            ? prevItems.filter((i) => i !== item)
                : [...prevItems, item]
        )
    }

    const handleResetFilters = () => {
        setSelectedCategories([]);
        setSelectedGenres([]);
        setSelectedThemes([]);
        setPriceRange({min: '', max: ''})
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
        setIsReadyForResetting(true)
    };

    return(
        <div className={styles.filters}>
            <p className={styles.filters_title}>Фільтри</p>
            <DropdownFilters title={"Категорія"}
                             categories={categories}
                             selectedCategories={selectedCategories}
                             setSelectedCategories={setSelectedCategories}
                             handleFunc={handleCheckBoxChange}>
            </DropdownFilters>
            <DropdownFilters title={"Жанри"}
                             categories={genres}
                             selectedCategories={selectedGenres}
                             setSelectedCategories={setSelectedGenres}
                             handleFunc={handleCheckBoxChange}>
            </DropdownFilters>
            <DropdownFilters title={"Тематика"}
                             categories={themes}
                             selectedCategories={selectedThemes}
                             setSelectedCategories={setSelectedThemes}
                             handleFunc={handleCheckBoxChange}>
            </DropdownFilters>
            <div className={styles.filters_price}>
                <div className={styles.filters_subtitle}>
                    <p className={styles.filters_subtitle}>Ціна</p>
                </div>
                <div className={styles.price_edges}>
                    <div className={styles.price_edge}>
                        <p className={styles.price_text}>від</p>
                        <div className={styles.price_amount}>
                            <input type="text"
                                   placeholder="500"
                                   onChange={(e) => handlePriceInputChange(e, 'min')}
                            />
                            <span>₴</span>
                        </div>
                    </div>
                    <div className={styles.price_edge}>
                        <p className={styles.price_text}>до</p>
                        <div className={styles.price_amount}>
                            <input type="text"
                                   placeholder="6000"
                                   onChange={(e) => handlePriceInputChange(e, 'max')}/>
                            <span>₴</span>
                        </div>
                    </div>
                </div>
            </div>
            <DropdownFilters title={"Вік"}
                             categories={age}
                             selectedCategories={selectedAges}
                             setSelectedCategories={setSelectedAges}
                             handleFunc={handleCheckBoxChange}>
            </DropdownFilters>
            <DropdownFilters title={"Кількість гравців"}
                             categories={players}
                             selectedCategories={selectedPlayersAmount}
                             setSelectedCategories={setSelectedPlayersAmount}
                             handleFunc={handleCheckBoxChange}>
            </DropdownFilters>
            <DropdownFilters title={"Час гри"}
                             categories={timeGame}
                             selectedCategories={selectedGameTimes}
                             setSelectedCategories={setSelectedGameTimes}
                             handleFunc={handleCheckBoxChange}>
            </DropdownFilters>
            <DropdownFilters title={"Мова"}
                             categories={languages}
                             selectedCategories={selectedLanguages}
                             setSelectedCategories={setSelectedLanguages}
                             handleFunc={handleCheckBoxChange}>
            </DropdownFilters>
            <div className={styles.filters_buttons}>
                <button className={styles.button_apply} type="submit" onClick={getSelectedFilters}>Застосувати</button>
                <button className={styles.button_reset} onClick={handleResetFilters}>Скинути фільтри</button>
            </div>
        </div>
    )
}