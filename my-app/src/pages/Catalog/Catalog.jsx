import React, { useEffect, useState } from 'react';
import styles from './Catalog.module.css';
import { CatalogFilters } from '@/pages/Catalog/CatalogFilters/CatalogFilters.jsx';
import { CatalogSorting } from '@/pages/Catalog/CatalogSorting/CatalogSorting.jsx';
import PaginationButtons from '@/components/PaginationButtons/PaginationButtons.jsx';
import { Breadcrumbs } from '@/pages/ProductPage/ProductOverview/Breadcrumbs/Breadcrumbs.jsx';
import {
    fetchProducts,
    resetFilters,
    setFilters,
    setPage,
    setSearchTerm,
} from '../../redux/productsCatalogSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import ProductCardList from '@/components/ProductCardList/ProductCardList.jsx';
import useWindowWidth from '../../hooks/useWindowWidth.js';
import { CatalogMobileTabs } from '@/pages/Catalog/CatalogMobileTabs/CatalogMobileTabs.jsx';
import { useLocation } from 'react-router-dom';
import {defaultProductCardConfig, threeProductsInRowConfig} from "@/configs/productCardConfig.js";
import useScrollToTop from "@/hooks/useScrollToTop.js";

const Catalog = () => {
    const { products, totalPages, page, pageSize, loading, filters } =
        useSelector((state) => state.productsCatalog);
    const dispatch = useDispatch();
    const [isDefaultChosenDisplaying, setIsDefaultChosenDisplaying] = useState(false);
    const windowWidth = useWindowWidth();
    const [isReadyForResetting, setIsReadyForResetting] = useState(false);
    const location = useLocation();
    useScrollToTop();

    useEffect(() => {
        const setLocalStates = async () => {
            await dispatch(resetFilters());
            if (location.state && location.state.searchTerm) {
                await dispatch(setSearchTerm(location.state.searchTerm));
            } else if (location.state){
                for (const key of Object.keys(location.state)) {
                    if (location.state[key]) {
                        await dispatch(setFilters({ [key]: location.state[key] }));
                    }
                }
            }
            await setIsReadyForResetting(true);
        };

        if (location.state) {
            setLocalStates();
        }else{
            dispatch(resetFilters());
            setIsReadyForResetting(true);
        }
    }, [location.state]);

    useEffect(() => {
        if (isReadyForResetting) {
            dispatch(fetchProducts({ page, pageSize, filters }));
            setIsReadyForResetting(false)
        }
    }, [dispatch, page, pageSize, filters, isReadyForResetting]);

    useEffect(() => {
        if (page > totalPages && totalPages >= 1) {
            dispatch(setPage(totalPages));
        }
    }, [totalPages]);

    const changePage = (newPage) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        dispatch(setPage(newPage));
        setIsReadyForResetting(true);
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
                    {location.state?.searchTerm &&
                        <p className={styles.catalog_searchTerm}>
                            Пошук за запитом: <b>{location.state?.searchTerm}</b>
                        </p>
                    }
                    <div className={styles.catalog_mainContainer}>
                        {windowWidth >= 1280 && (
                            <div className={styles.catalog_filters}>
                                <CatalogFilters setGlobalReset={setIsReadyForResetting}/>
                            </div>
                        )}
                        <div className={styles.catalog_displaying}>
                            {windowWidth >= 1280 ? (
                                <CatalogSorting
                                    setChosenDisplaying={setIsDefaultChosenDisplaying}
                                    setGlobalReset={setIsReadyForResetting}
                                />
                            ) : (
                                <CatalogMobileTabs
                                    setChosenDisplaying={setIsDefaultChosenDisplaying}
                                    setGlobalReset={setIsReadyForResetting}
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
                                    confingarationObj={isDefaultChosenDisplaying
                                        ?  defaultProductCardConfig
                                        :  threeProductsInRowConfig
                                }
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
