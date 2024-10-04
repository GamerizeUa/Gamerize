import {useEffect, useState} from "react";
import PaginationButtons from "@/components/PaginationButtons/PaginationButtons.jsx";
import ProductCardList from "@/components/ProductCardList/ProductCardList.jsx";
import styles from "./WishList.module.css";
import {
    selectWishListAddRemoveStatus,
    selectWishListPagesAmount,
    selectWishListProductsIdList,
    selectWishListProductsList,
} from "@/redux/selectors.js";
import {useDispatch, useSelector} from "react-redux";
import {getWishListProducts, removeAllFromWishList,} from "@/redux/wishListSlice.js";

function WishList() {
    const dispatch = useDispatch();
    const products = useSelector(selectWishListProductsList);
    const pagesAmount = useSelector(selectWishListPagesAmount);
    const [page, setPage] = useState(1);
    const productsIds = useSelector(selectWishListProductsIdList);
    const isEmpty = productsIds.length === 0;
    const wishListAddRemoveStatus = useSelector(selectWishListAddRemoveStatus);
    const [pageSize, setPageSize] = useState(0);

    useEffect(() => {
        handleResize();

        function handleResize() {
            const width = window.innerWidth;
            const sizeOfPage = width < 744 ? 6 : width < 1280 ? 9 : 12;
            if (sizeOfPage !== pageSize) {
                setPageSize(sizeOfPage);
            }
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!isEmpty && products.length === 0) {
            setPage(1);
        }
    }, [products]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [page]);

    useEffect(() => {
        dispatch(getWishListProducts({page, pageSize}));
    }, [page, productsIds, pageSize]);

    function changePage(newPage) {
        setPage(newPage);
    }

    function clearWishListOnClick() {
        if (wishListAddRemoveStatus === "loading") {
            return;
        }
        dispatch(removeAllFromWishList(productsIds));
    }

    return (
        <div className={"container"}>
            <div className={styles.header_container}>
                <h2 className={styles.header}>Список бажань</h2>
            </div>
            {isEmpty || (
                <div
                    onClick={clearWishListOnClick}
                    className={styles.clear_btn_container}
                >
                    <button className={styles.clear_btn}>Очистити</button>
                </div>
            )}
            <ProductCardList productCardList={products} isWishList={true}/>
            <div className={styles.pagination_btns_container}>
                {isEmpty && (
                    <p className={styles.empty_list_text}>Ваш список пустий</p>
                )}
                <PaginationButtons
                    pagesAmount={pagesAmount}
                    currentPage={page}
                    pageChangeFunc={changePage}
                />
            </div>
        </div>
    );
}

export default WishList;
