import styles from "./CatalogFilters.module.css";
import ArrowIconGallery from "../../ProductOverview/icons/ArrowGalleryIcon.jsx";
import React, {useState} from "react";
import CheckIcon from "../../icons/CheckIcon.jsx";


export const DropdownFilters = ({title, categories, selectedCategories, setSelectedCategories, handleFunc}) => {
    const[isCategoryVisible, setIsCategoryVisible] = useState(false);

    const toggleVisibility = () => {
        setIsCategoryVisible(!isCategoryVisible);
    };

    return (
        <div className={styles.filters_categories}>
            <div className={styles.filters_subtitle} onClick={toggleVisibility}>
                <p>{title}</p>
                <ArrowIconGallery style={{transform: isCategoryVisible ? 'rotate(90deg)' : 'rotate(-90deg)'}}/>
            </div>
            {isCategoryVisible &&
            <div className={styles.category_options}>
                {categories.map((category, index) => (
                    <label className={`${styles.category_option} ${selectedCategories.includes(category.name)
                        ? styles.category_checkedLabel : ''}`} key={index}>{category.name}
                        <input type="checkbox"
                               className={`${styles.option_checkbox} ${selectedCategories.includes(category.name)
                                   ? styles.option_checkedOption : ''}`}
                               onChange={() => handleFunc(category.name, setSelectedCategories)}
                        />
                        <span className={styles.option_checkmark}><CheckIcon/></span>
                    </label>
                ))}
            </div>}
        </div>

    )
}