import styles from "./CatalogFilters.module.css";
import ArrowIconGallery from "../../ProductOverview/icons/ArrowGalleryIcon.jsx";
import React, {useEffect, useState} from "react";
import CheckIcon from "../../icons/CheckIcon.jsx";


export const DropdownFilters = ({title, categories, selectedCategories, setSelectedCategories, handleFunc}) => {
    const[isCategoryVisible, setIsCategoryVisible] = useState(false);

    useEffect(() => {
        if(selectedCategories.length !== 0 && selectedCategories){
            setIsCategoryVisible(true)
        }
    }, [selectedCategories])

    const toggleVisibility = () => {
        setIsCategoryVisible(!isCategoryVisible);
    };

    const checkCategory = (categoryName, isCanDelete) => {
        return selectedCategories.some(category => {
            if (categoryName.includes('-') && !category.includes('-')) {
                categoryName.replace(/\s/g, '')
                const [minPlayers, maxPlayers] = categoryName.split('-').map(Number);
                const result = Number(category) >= minPlayers && Number(category) <= maxPlayers;
                isCanDelete && result
                    ? setSelectedCategories(prevItems => prevItems.filter((i) => i !== category)) : '';
                return result;
            }else if(categoryName.includes('-') && category.includes('-')){
                const result = categoryName.replace(/\s/g, '') === category.replace(/\s/g, '')
                isCanDelete && result
                    ? setSelectedCategories(prevItems => prevItems.filter((i) => i !== category)) : '';
                return result ;
            }else{
                return selectedCategories.includes(categoryName);
            }
        })
    }

    const handleCheckBoxChange = (item, arrayFunc) => {
        arrayFunc((prevItems) =>
            checkCategory(item, true)
                ? prevItems.filter((i) => i !== item)
                : [...prevItems, item]
        )
    }

    return (
        <div className={styles.filters_categories}>
            <div className={styles.filters_subtitle} onClick={toggleVisibility}>
                <p>{title}</p>
                <ArrowIconGallery style={{transform: isCategoryVisible ? 'rotate(90deg)' : 'rotate(-90deg)'}}/>
            </div>
            {isCategoryVisible &&
            <div className={styles.category_options}>
                {categories.map((category, index) => (
                    <label
                        className={`${styles.category_option} ${checkCategory(category.name 
                            ? category.name : category, false)
                            ? styles.category_checkedLabel : ''}`} key={index}>{category.name || category}
                        <input type="checkbox"
                               className={`${styles.option_checkbox}
                               ${checkCategory(category.name ? category.name : category, false) 
                                   ? styles.option_checkedOption : ''}`}
                               onChange={() =>
                                   handleCheckBoxChange(category.name ? category.name : category, setSelectedCategories)}
                        />
                        <span className={styles.option_checkmark}><CheckIcon/></span>
                        {title === "Час гри" && <span>хв</span>}
                    </label>
                ))}
            </div>}
        </div>

    )
}



// className={`${styles.option_checkbox} ${
//     (category.name || category).includes('-') ?
//         (category.name ? category.name : category).split('-').map(Number).some((num, i, arr) => {
//             if (i === 0) {
//                 return selectedCategories.some(cat => cat >= num && cat <= arr[i + 1]);
//             } else if (i === arr.length - 1) {
//                 return selectedCategories.some(cat => cat >= arr[i - 1] && cat <= num);
//             }
//             return false;
//         }) ? styles.option_checkedOption : '' :
//         selectedCategories.includes(Number(category.name || category)) ?
//             styles.option_checkedOption :
//             ''
// }`}