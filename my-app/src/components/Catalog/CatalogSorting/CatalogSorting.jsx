import styles from "./CatalogSorting.module.css"
import ArrowIconGallery from "../../ProductOverview/icons/ArrowGalleryIcon.jsx";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setSortingMethod} from "../../../redux/productsCatalogSlice.js";
import {DisplayThreeIcon} from "../icons/DisplayThreeIcon.jsx";
import {DisplayFourIcon} from "../icons/DisplayFourIcon.jsx";

export const CatalogSorting = ({setChosenDisplaying}) => {
    const[isSortingVisible, setIsSortingVisible] = useState(false);
    const [chosenOption, setChosenOption] = useState('За ціною');
    const [isActive, setIsActive] = useState({displayingThree: true, displayingFour: false});
    const dispatch = useDispatch()

    useEffect(() => {
        setChosenDisplaying((prevConfig) => ({ ...prevConfig, ...isActive }));
    }, [isActive])

    const handleClickSorting = () => {
        setIsSortingVisible(!isSortingVisible);
    }

    const handleOptionClick = (optionText) => {
        setChosenOption(optionText);
        setIsSortingVisible(false);
        dispatch(setSortingMethod(optionText));
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
            <div className={styles.catalogSorting_displaying}>
                <span>Відображення:</span>
                <div className={styles.catalogSorting_icons}>
                    <DisplayThreeIcon isActive={isActive.displayingThree} setIsActive={setIsActive}/>
                    <DisplayFourIcon isActive={isActive.displayingFour} setIsActive={setIsActive}/>
                </div>
            </div>
        </div>
    )
}