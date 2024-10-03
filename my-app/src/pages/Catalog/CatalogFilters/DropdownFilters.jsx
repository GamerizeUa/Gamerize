import styles from './CatalogFilters.module.css';
import ArrowIconGallery from '@/assets/icons/ArrowGalleryIcon.jsx';
import React, { useEffect, useState } from 'react';
import CheckIcon from '@/assets/icons/CheckIcon.jsx';

export const DropdownFilters = ({
    title,
    categories,
    selectedCategories,
    setSelectedCategories,
}) => {
    const [isCategoryVisible, setIsCategoryVisible] = useState(false);

    useEffect(() => {
        if (
            Array.isArray(selectedCategories) &&
            selectedCategories.length !== 0
        ) {
            setIsCategoryVisible(true);
        } else {
            setIsCategoryVisible(false);
        }
    }, [selectedCategories]);

    const toggleVisibility = () => {
        setIsCategoryVisible(!isCategoryVisible);
    };

    const handleCheckBoxChange = (arrayFunc, itemId, item) => {
        if (itemId) {
            arrayFunc((prevItems) =>
                prevItems.includes(itemId)
                    ? prevItems.filter((i) => i !== itemId)
                    : [...prevItems, itemId]
            );
        } else {
            if (item.includes('-')) {
                const newRange = separateRange(item);
                setSelectedCategories((prevRanges) =>
                    deleteOrAddCategory(prevRanges, newRange)
                );
            } else {
                const extractedNumber = Number(item.match(/\d+/g));
                setSelectedCategories((prevRanges) =>
                    deleteOrAddCategory(prevRanges, extractedNumber)
                );
            }
        }
    };

    const deleteOrAddCategory = (prevRanges, newItem) => {
        let existingRangeIndex = -1;
        if (typeof newItem === 'number') {
            existingRangeIndex = prevRanges.findIndex(
                (range) => range.min === newItem && range.max === 0
            );
        } else {
            existingRangeIndex = prevRanges.findIndex(
                (range) =>
                    range.min === newItem.min && range.max === newItem.max
            );
        }
        if (existingRangeIndex >= 0) {
            return prevRanges.filter(
                (_, index) => index !== existingRangeIndex
            );
        } else {
            return [
                ...prevRanges,
                typeof newItem === 'number'
                    ? { min: newItem, max: 0 }
                    : newItem,
            ];
        }
    };

    const separateRange = (category) => {
        category.replace(/\s/g, '');
        const [categoryMin, categoryMax] = category.split('-').map(Number);
        return { min: categoryMin, max: categoryMax };
    };

    const isCategorySelected = (selectedCategories, category) => {
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
        <div className={styles.filters_categories}>
            <div className={styles.filters_subtitle} onClick={toggleVisibility}>
                <p>{title}</p>
                <ArrowIconGallery
                    style={{
                        transform: isCategoryVisible
                            ? 'rotate(90deg)'
                            : 'rotate(-90deg)',
                    }}
                />
            </div>
            {isCategoryVisible && (
                <div className={styles.category_options}>
                    {categories.map((category, index) => (
                        <label
                            className={`${styles.category_option} 
                        ${
                            isCategorySelected(selectedCategories, category)
                                ? styles.category_checkedLabel
                                : ''
                        }`}
                            key={index}
                        >
                            {category.name || category}
                            <input
                                type="checkbox"
                                className={`${styles.option_checkbox} 
                        ${
                            isCategorySelected(selectedCategories, category)
                                ? styles.option_checkedOption
                                : ''
                        }`}
                                onChange={() =>
                                    handleCheckBoxChange(
                                        setSelectedCategories,
                                        category.id,
                                        category.name ? '' : category
                                    )
                                }
                            />
                            <span className={styles.option_checkmark}>
                                <CheckIcon />
                            </span>
                            {title === 'Час гри' && <span>хв</span>}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};
