import styles from "@/pages/Catalog/CatalogFilters/CatalogFilters.module.css";
import CheckIcon from "@/assets/icons/CheckIcon.jsx";
import React from "react";

export const FilterOption = ({category, selectedCategories, separateRange, clickCheckbox, title}) => {

    const isCategorySelected = (category) => {
        if (!Array.isArray(selectedCategories)) return false;

        if (
            selectedCategories &&
            selectedCategories.some((item) => typeof item === 'number')
        ) {
            return selectedCategories.includes(category.id || category);
        }

        if (
            selectedCategories &&
            selectedCategories.some((item) => typeof item === 'object')
        ) {
            if (category.includes('-')) {
                const range = separateRange(category);
                return selectedCategories.some(
                    (item) => item.min === range.min && item.max === range.max
                );
            } else {
                const extractedNumber = Number(category.match(/\d+/g));
                return selectedCategories.some(
                    (item) => item.min === extractedNumber && item.max === 0
                );
            }
        }
        return false;
    };

    return (
        <label
            className={`${styles.category_option} 
                        ${
                isCategorySelected(category)
                    ? styles.category_checkedLabel
                    : ''
            }`}
        >
            {category.name || category}
            <input
                type="checkbox"
                className={`${styles.option_checkbox} 
                        ${
                    isCategorySelected(category)
                        ? styles.option_checkedOption
                        : ''
                }`}
                onChange={() =>
                    clickCheckbox(
                        category.id,
                        category.name ? '' : category
                    )
                }
            />
            <span className={styles.option_checkmark}>
                                <CheckIcon/>
                            </span>
            {title === 'Час гри' && <span>хв</span>}
        </label>
    )
}