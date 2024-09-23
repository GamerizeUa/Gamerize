import React, { useEffect, useState } from 'react';
import styles from './Catalog.module.css';
import { CatalogFilters } from '@/pages/Catalog/CatalogFilters/CatalogFilters.jsx';
import { CatalogSorting } from '@/pages/Catalog/CatalogSorting/CatalogSorting.jsx';
import PaginationButtons from '@/components/PaginationButtons/PaginationButtons.jsx';
import { Breadcrumbs } from '../../components/ProductOverview/Breadcrumbs/Breadcrumbs.jsx';
import {
    fetchProducts,
    resetFilters,
    setFilters,
    setPage,
    setPageSize,
    setSearchTerm,
} from '../../redux/productsCatalogSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import ProductCardList from '@/components/ProductCardList/ProductCardList.jsx';
import useWindowWidth from '../../hooks/useWindowWidth.js';
import { CatalogMobileTabs } from '@/pages/Catalog/CatalogMobileTabs/CatalogMobileTabs.jsx';
import { useLocation } from 'react-router-dom';

const Catalog = () => {
    const { products, totalPages, page, pageSize, loading, filters } =
        useSelector((state) => state.productsCatalog);
    const dispatch = useDispatch();
    const [chosenDisplaying, setChosenDisplaying] = useState({
        displayingThree: true,
        displayingFour: false,
    });
    const windowWidth = useWindowWidth();
    const [isReadyForResetting, setIsReadyForResetting] = useState(false);
    const location = useLocation();
    const displayingThreeProductsInRow = {
        oneLineDesktopCardsAmount: 3,
        oneLineTabletCardsAmount: 3,
        oneLineMobileCardsAmount: 2,
        columnGapDesktopPercent: 1.8,
        columnGapTabletPercent: 3.7,
        columnGapMobilePercent: 5.5,
    };
    const displayingFourProductsInRow = {
        oneLineDesktopCardsAmount: 4,
        oneLineTabletCardsAmount: 3,
        oneLineMobileCardsAmount: 2,
        columnGapDesktopPercent: 1.8,
        columnGapTabletPercent: 3.7,
        columnGapMobilePercent: 5.5,
    };
    const [configurationObj, setConfigurationObj] = useState(
        displayingThreeProductsInRow
    );

    useEffect(() => {
        const setLocalStates = async () => {
            await dispatch(resetFilters());
            if (location.state.searchTerm) {
                await dispatch(setSearchTerm(location.state.searchTerm));
            } else {
                await dispatch(setFilters(location.state));
            }
            await setIsReadyForResetting(true);
        };

        if (location.state) {
            setLocalStates();
        }
    }, [location.state]);

    useEffect(() => {
        if (isReadyForResetting) {
            dispatch(fetchProducts({ page, pageSize, filters }));
        }
    }, [isReadyForResetting]);

    useEffect(() => {
        dispatch(fetchProducts({ page, pageSize, filters }));
    }, [dispatch, page, pageSize, filters]);

    useEffect(() => {
        if (page > totalPages && totalPages >= 1) {
            dispatch(setPage(totalPages));
        }
    }, [totalPages]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, []);

    useEffect(() => {
        if (chosenDisplaying.displayingThree) {
            setConfigurationObj((prevConfig) => ({
                ...prevConfig,
                ...displayingThreeProductsInRow,
            }));
            dispatch(setPageSize(12));
        } else {
            setConfigurationObj((prevConfig) => ({
                ...prevConfig,
                ...displayingFourProductsInRow,
            }));
            dispatch(setPageSize(20));
        }
        setIsReadyForResetting(true);
    }, [chosenDisplaying]);

    const changePage = (newPage) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        dispatch(setPage(newPage));
    };

    return (
        <div className={styles.catalog}>
            <div className="container">
                <div className={styles.catalog_container}>
                    <div className={styles.catalog_breadcrumbs}>
                        <Breadcrumbs
                            page={{ name: ['Каталог'], link: ['/catalog'] }}
                        />
                    </div>
                    <div className={styles.catalog_header}>
                        <p className={styles.catalog_pageTitle}>Каталог</p>
                    </div>
                    <div className={styles.catalog_mainContainer}>
                        {windowWidth >= 1280 && (
                            <div className={styles.catalog_filters}>
                                <CatalogFilters />
                            </div>
                        )}
                        <div className={styles.catalog_displaying}>
                            {windowWidth >= 1280 ? (
                                <CatalogSorting
                                    setChosenDisplaying={setChosenDisplaying}
                                />
                            ) : (
                                <CatalogMobileTabs
                                    setChosenDisplaying={setChosenDisplaying}
                                />
                            )}
                            {loading && products.length === 0 ? (
                                <p className={styles.catalog_empty}>
                                    Завантаження товарів ...
                                </p>
                            ) : (
                                ''
                            )}
                            <div className={styles.catalog_products}>
                                <ProductCardList
                                    productCardList={products}
                                    confingarationObj={configurationObj}
                                />
                            </div>
                            {!loading && products.length === 0 ? (
                                <p className={styles.catalog_empty}>
                                    Товарів не знайдено
                                </p>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                    <div className={styles.catalog_pagination}>
                        <PaginationButtons
                            pagesAmount={totalPages}
                            currentPage={page}
                            pageChangeFunc={changePage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Catalog;
