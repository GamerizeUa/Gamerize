import styles from "./CatalogFilters.module.css";
import ArrowIconGallery from "../../ProductOverview/icons/ArrowGalleryIcon.jsx";
import React, {useEffect, useState} from "react";
import CheckIcon from "../../icons/CheckIcon.jsx";


export const DropdownFilters = ({title, categories, selectedCategories, setSelectedCategories}) => {
    const[isCategoryVisible, setIsCategoryVisible] = useState(false);

    useEffect(() => {
        if (Array.isArray(selectedCategories) && selectedCategories.length !== 0) {
            setIsCategoryVisible(true);
        } else if (
            !Array.isArray(selectedCategories) &&
            selectedCategories &&
            !Object.values(selectedCategories).every(value => value === 0 || '')
        ) {
            setIsCategoryVisible(true);
        } else {
            setIsCategoryVisible(false);
        }
    }, [selectedCategories]);

    const toggleVisibility = () => {
        setIsCategoryVisible(!isCategoryVisible);
    };

    // const checkCategory = (categoryName, isCanDelete) => {
    //     return selectedCategories.some(category => {
    //         if (categoryName.includes('-') && !category.includes('-')) {
    //             categoryName.replace(/\s/g, '')
    //             const [minPlayers, maxPlayers] = categoryName.split('-').map(Number);
    //             setSelectedCategories((prevRange) => ({
    //                 ...prevRange,
    //                 'min': minPlayers ,
    //                 'max': maxPlayers ,
    //             }));
    //             // const result = Number(category) >= minPlayers && Number(category) <= maxPlayers;
    //             // isCanDelete && result
    //             //     ? setSelectedCategories(prevItems => prevItems.filter((i) => i !== category)) : '';
    //             // return result;
    //         }else if(categoryName.includes('-') && category.includes('-')){
    //             const result = categoryName.replace(/\s/g, '') === category.replace(/\s/g, '')
    //             isCanDelete && result
    //                 ? setSelectedCategories(prevItems => prevItems.filter((i) => i !== category)) : '';
    //             return result ;
    //         }else{
    //             return selectedCategories.includes(categoryName);
    //         }
    //     })
    // }

    const handleCheckBoxChange = (arrayFunc, itemId, item) => {
        if(itemId){
            arrayFunc((prevItems) =>
                prevItems.includes(itemId)
                    ? prevItems.filter((i) => i !== itemId)
                    : [...prevItems, itemId]
            )
        }else{
            if(item.includes('-')){
                item.replace(/\s/g, '')
                console.log(item);
                const [minItem, maxItem] = item.split('-').map(Number);
                console.log(minItem, maxItem);
                setSelectedCategories((prevRange) => ({
                    ...prevRange,
                    // min: minItem,
                    // max: minItem
                    min: prevRange.min !== 0 ? Math.min(prevRange.min, minItem) : minItem,
                    max: prevRange.max !== undefined ? Math.max(prevRange.max, maxItem) : maxItem,
                }));
            }else{
                const extractedNumber = item.match(/\d+/g);
                setSelectedCategories((prevRange) => ({
                    ...prevRange,
                    'min': Number(extractedNumber) ,
                    'max': ''
                }));
            }
        }
    }

    const isCategorySelected = (selectedCategories, category) => {
        if (Array.isArray(selectedCategories)) {
            return selectedCategories.includes(category.id || category);
        }

        if (selectedCategories.min !== undefined && selectedCategories.max !== undefined) {
            const [categoryMin, categoryMax] = (category.id || category).split('-').map(Number);
            return categoryMin >= selectedCategories.min && categoryMax <= selectedCategories.max;
        }

        return false;
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
                    <label
                        className={`${styles.category_option} 
                        ${isCategorySelected(selectedCategories, category) ? styles.category_checkedLabel : ''}`}

                        // className={`${styles.category_option} ${
                        //     Array.isArray(selectedCategories)
                        //         ? selectedCategories.includes(category.id || category)
                        //             ? styles.category_checkedLabel
                        //             : ''
                        //         : (`${selectedCategories.min} - ${selectedCategories.max}` === category)
                        //             ? styles.category_checkedLabel
                        //             : ''
                        // }`}

                        key={index}>{category.name || category}
                        <input type="checkbox"
                               className={`${styles.option_checkbox} 
                        ${isCategorySelected(selectedCategories, category) ? styles.option_checkedOption : ''}`}
                               // className={`${styles.option_checkbox} ${
                               //     Array.isArray(selectedCategories)
                               //         ? selectedCategories.includes(category.id || category)
                               //             ? styles.option_checkedOption
                               //             : ''
                               //         : (selectedCategories.min !== undefined && selectedCategories.max !== undefined &&
                               //             `${selectedCategories.min} - ${selectedCategories.max}` === category)
                               //             ? styles.option_checkedOption
                               //             : ''
                               // }`}

                               // className={`${styles.option_checkbox}
                               // ${category.id ? category.id : index
                               //     ? styles.option_checkedOption : ''}`}
                               onChange={() =>
                                   handleCheckBoxChange(setSelectedCategories, category.id,
                                       category.name ? '' : category)}
                        />
                        <span className={styles.option_checkmark}><CheckIcon/></span>
                        {title === "Час гри" && <span>хв</span>}
                    </label>
                ))}
            </div>}
        </div>

    )
}