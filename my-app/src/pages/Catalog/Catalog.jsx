import React, {useEffect, useState} from "react";
import styles from "./Catalog.module.css";
import {CatalogFilters} from "../../components/Catalog/CatalogFilters/CatalogFilters.jsx";
import {arrayProducts} from "./test.js";
import {CatalogSorting} from "../../components/Catalog/CatalogSorting/CatalogSorting.jsx";
import PaginationButtons from "../../components/common-components/PaginationButtons/PaginationButtons.jsx";
import {Breadcrumbs} from "../../components/ProductOverview/Breadcrumbs/Breadcrumbs.jsx";
import {setProductsCatalog} from "../../redux/productsCatalogSlice.js";
import {useDispatch, useSelector} from "react-redux";
import ProductCardList from "../../components/common-components/ProductCardList/ProductCardList.jsx";

const Catalog = () => {
  let [productsOffset, setProductsOffset] = useState(0);
  const productList = useSelector((state) => state.productsCatalog.products);
  const dispatch = useDispatch();
  const [productsLimitOnPage, setProductsLimitOnPage] = useState(12);
  const [chosenDisplaying, setChosenDisplaying] = useState({displayingThree: true, displayingFour: false});
  const pagesAmount = Math.ceil(productList.length / productsLimitOnPage);
  const displayingThreeProductsInRow = {
    oneLineDesktopCardsAmount: 3,
    oneLineTabletCardsAmount: 3,
    oneLineMobileCardsAmount: 2,
    columnGapDesktopPercent: 1.8,
    columnGapTabletPercent: 3.7,
    columnGapMobilePercent: 5.5
  }
  const displayingFourProductsInRow = {
    oneLineDesktopCardsAmount: 4,
    oneLineTabletCardsAmount: 3,
    oneLineMobileCardsAmount: 2,
    columnGapDesktopPercent: 1.8,
    columnGapTabletPercent: 3.7,
    columnGapMobilePercent: 5.5
  }
  const [configurationObj, setConfigurationObj] = useState(displayingThreeProductsInRow)


  useEffect(() => {
    const products = arrayProducts();
    dispatch(setProductsCatalog(products));
  }, []);

  useEffect(() => {
    if(chosenDisplaying.displayingThree){
      setConfigurationObj((prevConfig) => ({ ...prevConfig, ...displayingThreeProductsInRow }));
      setProductsLimitOnPage(12);
    }else{
      setConfigurationObj((prevConfig) => ({ ...prevConfig, ...displayingFourProductsInRow }));
      setProductsLimitOnPage(20);
    }
  }, [chosenDisplaying]);

  const changePage =  (newPage) => {
    setProductsOffset ((newPage - 1) * productsLimitOnPage)
  }

  const slicedProductList = productList.slice(productsOffset, productsOffset + productsLimitOnPage);

  return(
      <div className={styles.catalog}>
        <div className="container">
          <div className={styles.catalog_container}>
            <div className={styles.catalog_breadcrumbs}>
              <Breadcrumbs page={{name: ['Каталог'], link: ['/catalog']}} />
            </div>
            <div className={styles.catalog_header}>
              <p className={styles.catalog_pageTitle}>Каталог</p>
            </div>
            <div className={styles.catalog_mainContainer}>
              <div className={styles.catalog_filters}>
                <CatalogFilters/>
              </div>
              <div className={styles.catalog_displaying}>
                <CatalogSorting setChosenDisplaying={setChosenDisplaying} />
                <div className={styles.catalog_products}>
                  <ProductCardList productCardList={slicedProductList}
                                   confingarationObj={configurationObj}  />
                </div>
                {productList.length === 0 ? <p className={styles.catalog_empty}>Товарів не знайдено</p> : ''}
              </div>
            </div>
            <div className={styles.catalog_pagination}><PaginationButtons pagesAmount={pagesAmount}
                                                                          pageChangeFunc={changePage}/></div>
          </div>
        </div>
      </div>
  )
};

export default Catalog;