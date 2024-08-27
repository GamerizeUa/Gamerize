import styles from './ProductsMatch.module.css';
import sprite from "../../../assets/icons/sprite.svg";
import {Link, useNavigate} from "react-router-dom";

export const ProductsMatch = ({searchText, setMatchesDisplayed, products}) => {
    const navigate = useNavigate();

    const modifyImagePath = (imagePath) => {
        const baseUrl = "https://gamerize.ltd.ua";
        const formattedPath = imagePath?.replace(/\.\\wwwroot/g , '').replace(/\\/g, '/');

        return baseUrl + formattedPath;
    }

    const showAllMatchesInCatalog = () => {
        navigate('/catalog', { state: { searchTerm: searchText } });
        setMatchesDisplayed(false);
    }

    return (
        <div className={styles.matches_wrapper}>
            <div className={styles.matches}>
                <div className={styles.matches_container}>
                    <div className={styles.matches_list}>
                        {!products ? <p className={styles.matches_text}>Пошук товарів...</p> :
                            (
                                products.slice(0, 3).map((product, index) => (
                                    <Link to={`/catalog/${product.id}`} key={index}>
                                        <div className={styles.matches_item}
                                             onClick={() => setMatchesDisplayed(false)}
                                        >
                                            <div className={styles.matches_info}>
                                                <img
                                                    src={modifyImagePath(product.images[0]?.path)}
                                                    alt='Product photo'
                                                />
                                                <p>{product.name}</p>
                                            </div>
                                            <svg width="18" height="18">
                                                <use href={sprite + "#icon-arrow-right-up"} fill="#FFFFFF"
                                                     stroke="#2B2B2B"/>
                                            </svg>
                                        </div>
                                    </Link>
                                ))
                            )}
                        {products.length === 0  &&
                            <p className={styles.matches_text}>
                                Товарів за запитом <span>'{searchText}'</span> не знайдено
                            </p>}
                    </div>
                    {products.length > 0  &&
                        <div className={styles.matches_all} onClick={showAllMatchesInCatalog}>
                            <p>Переглянути всі</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}