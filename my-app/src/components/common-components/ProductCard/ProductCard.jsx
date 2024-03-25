import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import HeartIcon from "../../icons/HeartIcon";
import { useDispatch, useSelector } from "react-redux";
import { selectWishListProductsIdList } from "../../../redux/selectors";
import {
    addToWishList,
    removeOneFromWishList,
} from "../../../redux/wishListSlice";
import sprite from "../../../assets/icons/sprite.svg";

export default function ProductCard({
    configurationObject = {
        isOldPrice: false,
        isDiscount: false,
        isWishList: false,
    },
    product: {
        id,
        discount,
        name,
        minPlayers,
        maxPlayers,
        minAge,
        price,
        oldPrice,
        gameTimeMinutes,
        photo,
    },
}) {
    const dispath = useDispatch();
    const wishListProductsIdList = useSelector(selectWishListProductsIdList);
    const isWished = wishListProductsIdList.includes(id);
    const wishIconHandleOnClick = () => {
        isWished
            ? dispath(removeOneFromWishList(id))
            : dispath(addToWishList(id));
    };
    return (
        <div className={styles.all_content}>
            <Link
                className={styles.all_card_link}
                to={"/catalog/:product"}
            ></Link>
            <div className={styles.card_top}>
                <div className={styles.icons_bar}>
                    {configurationObject.isDiscount ? (
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
                            configurationObject.isWishList ? (
                                <svg>
                                    <use href={sprite + "#icon-cross"} />
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
                    >{`${gameTimeMinutes} хв`}</p>
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
                    {configurationObject.isOldPrice && (
                        <p
                            className={styles.price + " " + styles.old_price}
                        >{`${oldPrice}₴`}</p>
                    )}
                    <p
                        className={styles.price + " " + styles.current_price}
                    >{`${price}₴`}</p>
                </div>
                <button className={styles.buy_btn}>Купити</button>
            </div>
        </div>
    );
}
