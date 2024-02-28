import { useEffect, useState } from "react";
import PaginationButtons from "../common-components/PaginationButtons/PaginationButtons";
import ProductCardList from "../common-components/ProductCardList/ProductCardList";
import styles from "./WishList.module.css";
import { selectWishListProductsList } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { removeAllFromWishList } from "../../redux/wishListSlice";

function WishList() {
    const products = useSelector(selectWishListProductsList);
    const dispatch = useDispatch();
    const pageLimit = 8;
    const pagesAmount = Math.ceil(products.length / pageLimit); //todo : it should be taken from server
    const [productsOffset, setProductsOffset] = useState(0); //! amount of skipped products to get needed can be replaced by page potentially
    const productsPortion = products.slice(
        productsOffset,
        productsOffset + pageLimit
    );
    if (!productsPortion[0] && productsOffset !== 0)
        setProductsOffset(productsOffset - pageLimit);

    useEffect(() => {
        // get new portion of products and dispatch products with products + new portion
    }, [productsOffset]);

    function changePage(newPage) {
        setProductsOffset((newPage - 1) * pageLimit);
    }
    function clearWishListOnClick() {
        dispatch(removeAllFromWishList());
    }
    return (
        <div className={styles.container + " container"}>
            <div className={styles.header_container}>
                <h2 className={styles.header}>Список бажань</h2>
            </div>
            <div
                onClick={clearWishListOnClick}
                className={styles.clear_btn_container}
            >
                <button className={styles.clear_btn}>Очистити</button>
            </div>
            <ProductCardList productCardList={productsPortion} />
            <div className={styles.pagination_btns_container}>
                <PaginationButtons
                    pagesAmount={pagesAmount}
                    pageChangeFunc={changePage}
                />
            </div>
        </div>
    );
}

export default WishList;
