import styles from "@/pages/Catalog/CatalogFilters/CatalogFilters.module.css";

export const PriceFilter = ({setPriceRange}) => {

    const handlePriceInputChange = (event, type) => {
        const value = event.target.value.replace(/[^0-9]/g, '');
        const numericValue = parseInt(value, 10);

        setPriceRange(prev => ({
            ...prev,
            price: [{
                ...prev.price[0],
                [type]: numericValue || 0
            }]
        }));
    };

    return (
        <div className={styles.filters_price}>
            <div className={styles.filters_subtitle}>
                <p className={styles.filters_subtitle}>Ціна</p>
            </div>
            <div className={styles.price_edges}>
                <div className={styles.price_edge}>
                    <p className={styles.price_text}>від</p>
                    <div className={styles.price_amount}>
                        <input
                            type="text"
                            placeholder="500"
                            onChange={(e) =>
                                handlePriceInputChange(e, 'min')
                            }
                        />
                        <span>₴</span>
                    </div>
                </div>
                <div className={styles.price_edge}>
                    <p className={styles.price_text}>до</p>
                    <div className={styles.price_amount}>
                        <input
                            type="text"
                            placeholder="6000"
                            onChange={(e) =>
                                handlePriceInputChange(e, 'max')
                            }
                        />
                        <span>₴</span>
                    </div>
                </div>
            </div>
        </div>
    )
}