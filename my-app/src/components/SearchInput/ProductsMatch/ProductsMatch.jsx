import styles from './ProductsMatch.module.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchProducts} from "../../../redux/productsCatalogSlice.js";
import sprite from "../../../assets/icons/sprite.svg";
import {Link, useNavigate} from "react-router-dom";

export const ProductsMatch = ({searchText, setMatchesDisplayed}) => {
    const {products, page, pageSize, filters, loading} = useSelector((state) => state.productsCatalog);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProducts({page, pageSize, filters}))
    }, [dispatch, searchText]);


    const modifyImagePath = (imagePath) => {
        const baseUrl = "https://gamerize.ltd.ua/images";
        const formattedPath = imagePath?.replace(/\.\\wwwroot\\images\\\.\\wwwroot\\images/g, '')?.replace(/\\/g, '/');

        return baseUrl + formattedPath;
    }

    const showAllMatchesInCatalog = () => {
        navigate('/catalog');
        setMatchesDisplayed(false);
    }

    return (
        <div className={styles.matches_wrapper}>
            <div className={styles.matches}>
                <div className={styles.matches_container}>
                    <div className={styles.matches_list}>
                        {loading ? <p className={styles.matches_text}>Пошук товарів...</p> :
                            (
                                products.slice(0, 3).map((product, index) => (
                                    <Link to={`/catalog/${product.id}`}>
                                        <div className={styles.matches_item}
                                             key={index}
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
                        {products.length === 0 && !loading &&
                            <p className={styles.matches_text}>
                                Товарів за запитом <span>'{searchText}'</span> не знайдено
                            </p>}
                    </div>
                    {products.length > 0 && !loading &&
                        <div className={styles.matches_all} onClick={showAllMatchesInCatalog}>
                            <p>Переглянути всі</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}