import {CatalogSorting} from "../CatalogSorting/CatalogSorting.jsx";
import styles from "./CatalogMobileTabs.module.css";
import {useState} from "react";
import {CatalogFilters} from "../CatalogFilters/CatalogFilters.jsx";
import useNoScroll from "../../hooks/useNoScroll.js";

export const CatalogMobileTabs = ({setChosenDisplaying}) => {
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    useNoScroll(true);

    const handleOpenFilters = (isOpen) => {
        setIsFiltersVisible(isOpen);
    }

    const closeFiltersByClicking = (event) => {
        if (event.currentTarget === event.target) {
            handleOpenFilters(false);
        }
    }

    return (
        <div className={styles.tabs}>
            <CatalogSorting setChosenDisplaying={setChosenDisplaying}/>
            <div className={styles.tabs_filters}
                 onClick={() => handleOpenFilters(true)}>
                Фільтри
            </div>
            {isFiltersVisible &&
                <div className={styles.filters_background} onClick={closeFiltersByClicking}>
                    <div className={styles.filters}>
                        <div className={styles.filters_container}>
                            <div className={styles.filters_cross}
                                 onClick={() => handleOpenFilters(false)}>
                            </div>
                            <CatalogFilters/>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}