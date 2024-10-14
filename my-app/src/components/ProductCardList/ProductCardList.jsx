import styles from "./ProductCardList.module.css";
import ProductCard from "@/components/ProductCard/ProductCard.jsx";
import useWindowWidth from "@/hooks/useWindowWidth.js";
import {defaultProductCardConfig} from "@/configs/productCardConfig.js";

function ProductCardList({
    confingarationObj = defaultProductCardConfig,
    productCardList = [],
    isWishList = false,
}) {
    const {
        oneLineDesktopCardsAmount,
        oneLineTabletCardsAmount,
        oneLineMobileCardsAmount,
        columnGapDesktopPercent,
        columnGapTabletPercent,
        columnGapMobilePercent,
    } = confingarationObj;
    const windowWidth = useWindowWidth();
    const oneLineCardsAmount =
        windowWidth < 744
            ? oneLineMobileCardsAmount
            : windowWidth < 1280
            ? oneLineTabletCardsAmount
            : oneLineDesktopCardsAmount;
    const columnGapPercent =
        windowWidth < 744
            ? columnGapMobilePercent
            : windowWidth < 1280
            ? columnGapTabletPercent
            : columnGapDesktopPercent;

    const cardPercentWidth =
        (100 - columnGapPercent * (oneLineCardsAmount - 1)) /
        oneLineCardsAmount;

    return (
        <div
            className={styles.container}
            style={{ columnGap: `${columnGapPercent}%` }}
        >
            {productCardList.map((product) => (
                <div
                    className={styles.product_wrap}
                    key={product.id}
                    style={{ width: `${cardPercentWidth}%` }}
                >
                    <ProductCard
                        product={product}
                        configurationObject={{ isWishList }}
                    />
                </div>
            ))}
        </div>
    );
}

export default ProductCardList;
