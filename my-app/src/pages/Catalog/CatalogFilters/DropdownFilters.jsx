import styles from './CatalogFilters.module.css';
import ArrowIconGallery from '@/assets/icons/ArrowGalleryIcon.jsx';
import React, { useEffect, useState } from 'react';
import {FilterOption} from "@/pages/Catalog/CatalogFilters/FilterOption.jsx";

export const DropdownFilters = ({
    title,
    categories,
    selectedCategories,
    updateSelectedCategories,
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

    const handleCheckBoxChange = (itemId, item) => {
        if (itemId) {
            const result =  selectedCategories.includes(itemId)
                ? selectedCategories.filter((i) => i !== itemId)
                : [...selectedCategories, itemId];
            updateSelectedCategories((result))

        } else {
            if (item.includes('-')) {
                const newRange = separateRange(item);
                const result = deleteOrAddCategory(selectedCategories, newRange)
                updateSelectedCategories((result))
            } else {
                const extractedNumber = Number(item.match(/\d+/g));
                const result = deleteOrAddCategory(selectedCategories, extractedNumber)
                updateSelectedCategories((result)
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
                        <div key={index}>
                            <FilterOption
                                category={category}
                                selectedCategories={selectedCategories}
                                separateRange={separateRange}
                                clickCheckbox={handleCheckBoxChange}
                                title={title}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
