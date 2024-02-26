import styles from "./CatalogSorting.module.css"
import ArrowIconGallery from "../../ProductOverview/icons/ArrowGalleryIcon.jsx";
import React, {useState} from "react";
import {setMethod} from "../../../redux/sortingMethod.js";
import {useDispatch, useSelector} from "react-redux";
import {setProductsCatalog} from "../../../redux/productsCatalog.js";

export const CatalogSorting = () => {
    const[isSortingVisible, setIsSortingVisible] = useState(false);
    const [chosenOption, setChosenOption] = useState('За ціною');
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productsCatalog.value);

    const handleClickSorting = () => {
        setIsSortingVisible(!isSortingVisible);
    }

    const sortingOperations = {
        'Ціна: Від нижчої': (a, b) => a.price - b.price,
        'Назва: Я - А': (a, b) => b.name.localeCompare(a.name),
        'Ціна: Від вищої': (a, b) => b.price - a.price,
        'Назва: А - Я': (a, b) => a.name.localeCompare(b.name),
    };

    const handleOptionClick = (optionText) => {
        setChosenOption(optionText);
        setIsSortingVisible(false);
        const sortedProducts = [...productList].sort(sortingOperations[optionText]);
        dispatch(setProductsCatalog(sortedProducts))
        dispatch(setMethod(optionText));
    };

    return (
        <div className={styles.catalogSorting_options}>
            <div className={styles.catalogSorting_toSort}>
                <span>Сортування:</span>
                <div className={styles.catalogSorting_sorting}
                     onClick={handleClickSorting}>{chosenOption}
                    <ArrowIconGallery style={{transform: isSortingVisible ? 'rotate(90deg)' : 'rotate(-90deg)'}}/>
                </div>
                {isSortingVisible &&
                    <div className={styles.catalogSorting_sortingOptions}>
                        <p onClick={() => handleOptionClick('Ціна: Від вищої')}>Ціна: Від вищої</p>
                        <p onClick={() => handleOptionClick('Назва: Я - А')}>Назва: Я - А</p>
                        <p onClick={() => handleOptionClick('Ціна: Від нижчої')}>Ціна: Від нижчої</p>
                        <p onClick={() => handleOptionClick('Назва: А - Я')}>Назва: А - Я</p>
                    </div>
                }
            </div>
            <div>
                <span>Відображення:</span>
            </div>
        </div>
    )
}