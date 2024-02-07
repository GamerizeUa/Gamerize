import { useEffect, useState } from "react";
import styles from "./ProductCardList.module.css";
import ProductCard from "../ProductCard/ProductCard";

function ProductCardList({
    confingarationObj: {
        oneLineDesktopCardsAmount,
        oneLineTabletCardsAmount,
        oneLineMobileCardsAmount,
        columnGapDesktopPercent,
        columnGapTabletPercent,
        columnGapMobilePercent,
    } = {
        oneLineDesktopCardsAmount: 4,
        oneLineTabletCardsAmount: 3,
        oneLineMobileCardsAmount: 2,
        columnGapDesktopPercent: 1.8,
        columnGapTabletPercent: 3.7,
        columnGapMobilePercent: 5.5,
    },
    productCardList = [],
}) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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

    const handleChangedSize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleChangedSize);
        return () => {
            window.removeEventListener("resize", handleChangedSize);
        };
    }, []);

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
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
}

export default ProductCardList;
