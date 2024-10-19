import styles from "./ProductCard.module.css";
import {Link} from "react-router-dom";
import HeartIcon from "@/assets/icons/HeartIcon.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectIsInCart, selectWishListAddRemoveStatus, selectWishListProductsIdList,} from "@/redux/selectors.js";
import {addToWishList, removeOneFromWishList} from "@/redux/wishListSlice.js";
import sprite from "@/assets/icons/sprite.svg";
import {addToCart, updateCartProduct} from "@/redux/cartSlice.js";
import {getImagePath} from "@/utils/getImagePath.js";
import useCheckAuth from "@/hooks/useCheckAuth.js";
import {assignIsDisplayedLoginPopUp} from "@/redux/formsDisplaying.js";
import {calculateTotalDiscount} from "@/utils/discounts.js";

export default function ProductCard({
                                        configurationObject: {isDiscount, isWishList} = {
                                            isDiscount: false,
                                            isWishList: false,
                                        },
                                        product: {
                                            id,
                                            name,
                                            minPlayers,
                                            maxPlayers,
                                            minAge,
                                            price,
                                            minGameTimeMinutes,
                                            maxGameTimeMinutes,
                                            images,
                                            discounts
                                        },
                                    }) {
    let discount = discounts[0]?.currentDiscount;
    let newPrice = 0;
    if (discount) {
        isDiscount = true;
        newPrice = Number((price * (1 - discount)).toFixed(0));
        discount *= 100;
    }
    const dispatch = useDispatch();
    const photo = images && images[0];
    const wishListProductsIdList = useSelector(selectWishListProductsIdList);
    const isWished = wishListProductsIdList.includes(id);
    const wishListAddRemoveStatus = useSelector(selectWishListAddRemoveStatus);
    const isInCart = useSelector((state) => selectIsInCart(state, id));
    const {checkAuthentication} = useCheckAuth();
    const isAuthenticated = checkAuthentication();

    const wishIconHandleOnClick = async () => {
        if (wishListAddRemoveStatus === "loading") {
            return;
        }
        if (!isAuthenticated) {
            dispatch(assignIsDisplayedLoginPopUp(true));
            return;
        }
        if (isWishList) {
            dispatch(removeOneFromWishList(id));
        } else {
            isWished
                ? dispatch(removeOneFromWishList(id))
                : dispatch(addToWishList(id));
        }
    };

    const handleAddToCart = () => {
        dispatch(addToCart({
            id,
            name,
            price: calculateTotalDiscount(price, discounts),
            photo,
            count: 1
        }));
    };
    const handleUpdateCount = () => {
        dispatch(updateCartProduct({id, modifier: 1}));
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
                                <use href={sprite + "#icon-discount"}></use>
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
                                    <use
                                        href={sprite + "#icon-cross"}
                                        stroke="black"
                                    />
                                </svg>
                            ) : (
                                <HeartIcon isFilled/>
                            )
                        ) : (
                            <HeartIcon strokeColor="#AAC4FF"/>
                        )}
                    </div>
                </div>
                <div className={styles.image_container}>
                    <img
                        src={getImagePath(images[0]?.path)}
                        alt={`product ${name} # ${id}`}
                        loading="lazy"
                    />
                </div>
                <div className={styles.features_bar}>
                    <p
                        className={styles.features_bar_element}
                    >
                        {minGameTimeMinutes === maxGameTimeMinutes
                            ? `${minGameTimeMinutes} хв`
                            : `${minGameTimeMinutes}-${maxGameTimeMinutes} хв`}
                    </p>
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
                            className={styles.price + " " + styles.old_price}
                        >{`${price}₴`}</p>
                    )}
                    <p
                        className={styles.price + " " + styles.current_price}
                    >{`${isDiscount ? newPrice : price}₴`}</p>
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
