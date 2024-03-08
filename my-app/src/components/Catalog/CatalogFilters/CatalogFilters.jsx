import styles from "./CatalogFilters.module.css";
import CheckIcon from "../../icons/CheckIcon.jsx";
import {filterProducts} from './filters.js';
import React, {useEffect, useState} from "react";
import {arrayProducts} from '../../../pages/Catalog/test.js';
import {setProductsCatalog} from "../../../redux/productsCatalog.js";
import {useDispatch, useSelector} from "react-redux";
import {DropdownFilters} from "./DropdownFilters.jsx";

export  const CatalogFilters = () => {
    const categories = ["Творчі ігри", "Стратегія", "Детектив", "Гумор", "Квест", "Пригоди"];
    const age = ["3 - 6", "6 - 9", "9 - 12", "12 - 18", "18+"];
    const timeGame = ["15 - 30", "40 - 60", "70 - 90", "115 - 180", "240"];
    const languages = ["Українська", "Англійська", "Іспанська"];
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [selectedAges, setSelectedAges] = useState([]);
    const [selectedGameTimes, setSelectedGameTimes] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [isReadyForResetting, setIsReadyForResetting] = useState(false);
    const methodSorting = useSelector((state) => state.sortingMethod.value);
    const dispatch = useDispatch();

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

    const sortingOperations = {
        'Ціна: Від нижчої': (a, b) => a.price - b.price,
        'Назва: Я - А': (a, b) => b.name.localeCompare(a.name),
        'Ціна: Від вищої': (a, b) => b.price - a.price,
        'Назва: А - Я': (a, b) => a.name.localeCompare(b.name),
    };

    const getSelectedFilters = () => {
        const filters = {
            categories: selectedCategories,
            price: priceRange,
            ages: selectedAges,
            gameTimes: selectedGameTimes,
            languages: selectedLanguages,
        };
        const products = arrayProducts();
        const result = filterProducts(products,filters);
        const sortedProducts = [...result].sort(sortingOperations[methodSorting]);
        dispatch(setProductsCatalog(sortedProducts));
    };

    const handleCategoryChange = (category) => {
        setSelectedCategories((prevCategories) =>
            prevCategories.includes(category)
                ? prevCategories.filter((c) => c !== category)
                : [...prevCategories, category]
        );
    };

    const handleAgeChange = (age) => {
        setSelectedAges((prevAges) =>
            prevAges.includes(age) ? prevAges.filter((a) => a !== age) : [...prevAges, age]
        );
    };

    const handleGameTimeChange = (gameTime) => {
        setSelectedGameTimes((prevGameTimes) =>
            prevGameTimes.includes(gameTime)
                ? prevGameTimes.filter((t) => t !== gameTime)
                : [...prevGameTimes, gameTime]
        );

    };

    const handleLanguageChange = (language) => {
        setSelectedLanguages((prevLanguages) =>
            prevLanguages.includes(language)
                ? prevLanguages.filter((l) => l !== language)
                : [...prevLanguages, language]
        );
    };

    const handleResetFilters = () => {
        setSelectedCategories([]);
        setPriceRange({min: '', max: ''})
        setSelectedAges([]);
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
                             handleFunc={handleCategoryChange}>
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
            <div className={styles.filters_categories}>
                <div className={styles.filters_subtitle}>
                <p className={styles.filters_subtitle}>Вік:</p>
                </div>
                <div className={styles.category_options}>
                    {age.map((name, index) => (
                        <label className={`${styles.category_option} ${selectedAges.includes(name) 
                            ? styles.category_checkedLabel : ''}`} key={index}>{name}
                            <input type="checkbox"
                                   className={styles.option_checkbox}
                                   onChange={() => handleAgeChange(name)}
                            />
                            <span className={styles.option_checkmark}><CheckIcon/></span>
                        </label>
                    ))}
                </div>
            </div>
            <div className={styles.filters_categories}>
                <div className={styles.filters_subtitle}>
                    <p className={styles.filters_subtitle}>Час гри:</p>
                </div>
                <div className={styles.category_options}>
                    {timeGame.map((name, index) => (
                        <label className={`${styles.category_option} ${selectedGameTimes.includes(name)
                            ? styles.category_checkedLabel : ''}`} key={index}>{name}
                            <input type="checkbox"
                                   className={styles.option_checkbox}
                                   onChange={() => handleGameTimeChange(name)}
                            />
                            <span className={styles.option_checkmark}><CheckIcon/></span>
                            <span>хв</span>
                        </label>
                    ))}
                </div>
            </div>
            <div className={styles.filters_categories}>
                <div className={styles.filters_subtitle}>
                    <p className={styles.filters_subtitle}>Мова:</p>
                </div>
                <div className={styles.category_options}>
                    {languages.map((name, index) => (
                        <label className={`${styles.category_option} ${selectedLanguages.includes(name)
                            ? styles.category_checkedLabel : ''}`} key={index}>{name}
                            <input type="checkbox"
                                   className={styles.option_checkbox}
                                   onChange={() => handleLanguageChange(name)}
                            />
                            <span className={styles.option_checkmark}><CheckIcon/></span>
                        </label>
                    ))}
                </div>
            </div>
            <div className={styles.filters_buttons}>
                <button className={styles.button_apply} type="submit" onClick={getSelectedFilters}>Застосувати</button>
                <button className={styles.button_reset} onClick={handleResetFilters}>Скинути фільтри</button>
            </div>
        </div>
    )
}