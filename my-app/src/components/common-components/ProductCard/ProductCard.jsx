import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import HeartIcon from '../../icons/HeartIcon';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectIsInCart,
    selectWishListProductsIdList,
} from '../../../redux/selectors';
import {
    addToWishList,
    removeOneFromWishList,
} from '../../../redux/wishListSlice';
import sprite from '../../../assets/icons/sprite.svg';
import { addToCart, updateCartProduct } from '../../../redux/cartSlice';

export default function ProductCard({
    configurationObject : {isDiscount, isWishList} = {
        isDiscount: false,
        isWishList: false,
    },
    product,
    product: {
        id,
        name,
        minPlayers,
        maxPlayers,
        minAge,
        price,
        newPrice,
        minGameTimeMinutes,
        maxGameTimeMinutes,
        images,
    },
}) {
    let discount = 0;
    if (isDiscount){
        if (newPrice === 0) {
            isDiscount = false;
        }
        else {
            discount = Math.floor((1 - newPrice / price) * 100);    
        }
    }
    const dispatch = useDispatch();
    const photo = images && images[0];
    const wishListProductsIdList = useSelector(selectWishListProductsIdList);
    const isWished = wishListProductsIdList.includes(id);
    const isInCart = useSelector((state) => selectIsInCart(state, id));

    const wishIconHandleOnClick = () => {
        isWished
            ? dispatch(removeOneFromWishList(id))
            : dispatch(addToWishList(id));
    };
    const handleAddToCart = () => {
        dispatch(addToCart({ id, name, price, photo, count: 1 }));
    };
    const handleUpdateCount = () => {
        dispatch(updateCartProduct({ id, modifier: 1 }));
    };

    return (
        <div className={styles.all_content}>
            <Link className={styles.all_card_link} to={`/catalog/${id}`}></Link>
            <div className={styles.card_top}>
                <div className={styles.icons_bar}>
                    {isDiscount ? (
                        <div className={styles.discount_icon_container}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="57"
                                height="55"
                                viewBox="0 0 57 55"
                                fill="none"
                            >
                                <use href={sprite + '#icon-discount'}></use>
                            </svg>
                            <p>{`-${discount}%`}</p>
                        </div>
                    ) : (
                        <p className={styles.hit_icon}>Хіт</p>
                    )}
                    <div
                        onClick={wishIconHandleOnClick}
                        className={styles.wish_list_icon_container}
                    >
                        {isWished ? (
                            isWishList ? (
                                <svg>
                                    <use href={sprite + '#icon-cross'} />
                                </svg>
                            ) : (
                                <HeartIcon
                                    fill="#AAC4FF"
                                    strokeColor="#AAC4FF"
                                />
                            )
                        ) : (
                            <HeartIcon strokeColor="#AAC4FF" />
                        )}
                    </div>
                </div>
                <div className={styles.image_container}>
                    <img src={photo} alt={`product ${name} # ${id}`} />
                </div>
                <div className={styles.features_bar}>
                    <p
                        className={styles.features_bar_element}
                    >{`${minGameTimeMinutes}-${maxGameTimeMinutes} хв`}</p>
                    <p className={styles.features_bar_element}>
                        {maxPlayers
                            ? `${minPlayers}-${maxPlayers} гравців`
                            : `від ${minPlayers} гравців`}
                    </p>
                    <p
                        className={styles.features_bar_element}
                    >{`${minAge}+`}</p>
                </div>
            </div>
            <div className={styles.card_bottom}>
                <p className={styles.title}>{name}</p>
                <div className={styles.prices}>
                    {isDiscount && (
                        <p
                            className={styles.price + ' ' + styles.old_price}
                        >{`${price}₴`}</p>
                    )}
                    <p
                        className={styles.price + ' ' + styles.current_price}
                    >{`${isDiscount? newPrice: price}₴`}</p>
                </div>

                <button
                    className={styles.buy_btn}
                    onClick={!isInCart ? handleAddToCart : handleUpdateCount}
                >
                    Купити
                </button>
            </div>
        </div>
    );
}
