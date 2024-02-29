import styles from './ProductCard.module.css'
import { Link } from 'react-router-dom';
import HeartIcon from '../../icons/HeartIcon';
import { useDispatch, useSelector } from 'react-redux';
import { selectWishListProductsIdList } from '../../../redux/selectors';
import { addToWishList, removeOneFromWishList } from '../../../redux/wishListSlice';
import sprite from "../../../assets/icons/sprite.svg";

export default function ProductCard({configurationObject = {isOldPrice : false, isDiscount : false, isWishList : false}, product : {id,discount, name, minPlayers, maxPlayers, minAge, price, oldPrice, gameTimeMinutes,photo}}) {
    const dispath = useDispatch()
    const wishListProductsIdList = useSelector(selectWishListProductsIdList)
    const isWished = wishListProductsIdList.includes(id)
    const wishIconHandleOnClick = () => {
        isWished? dispath(removeOneFromWishList(id)) : dispath(addToWishList(id))
    }
    return (
        <div className={styles.allContent}>
            <Link className={styles.allCardLink} to={"/catalog/:product"}></Link>
            <div className={styles.cardTop}>
                    <div className={styles.iconsBar}>
                        {
                            configurationObject.isDiscount?
                            <div className={styles.discountIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="57" height="55" viewBox="0 0 57 55" fill="none">
                                    <path d="M23.2205 4.15229C24.8886 -0.951232 32.1114 -0.951232 33.7795 4.1523C34.8342 7.37914 38.5146 8.91184 41.5469 7.38542L41.9591 7.17792C46.6638 4.80964 51.6278 9.89152 49.1535 14.5413C47.562 17.532 49.0866 21.2334 52.3232 22.2341C57.3937 23.8018 57.3937 30.979 52.3232 32.5467C49.0866 33.5475 47.562 37.2488 49.1535 40.2395C51.6278 44.8893 46.6638 49.9712 41.9591 47.6029L41.5469 47.3954C38.5146 45.869 34.8342 47.4017 33.7795 50.6285C32.1114 55.7321 24.8886 55.7321 23.2205 50.6285C22.1658 47.4017 18.4854 45.869 15.4531 47.3954L15.0409 47.6029C10.3362 49.9712 5.37217 44.8893 7.84653 40.2395C9.438 37.2488 7.91337 33.5475 4.67679 32.5467C-0.393717 30.979 -0.393717 23.8018 4.67679 22.2341C7.91337 21.2334 9.438 17.532 7.84653 14.5413C5.37217 9.89152 10.3362 4.80964 15.0409 7.17793L15.4531 7.38542C18.4854 8.91184 22.1658 7.37914 23.2205 4.15229Z" fill="#FF5E00"/>
                                </svg>
                                <p>{`-${discount}%`}</p>
                            </div>
                            : <div className={styles.hitIcon}><p>Хіт</p></div>
                        }
                        <div onClick={wishIconHandleOnClick} className={styles.wishListIcon}>
                            {
                                isWished? 
                                    configurationObject.isWishList?
                                        <svg>
                                            <use href={sprite + "#icon-cross"} />
                                        </svg>:
                                    <HeartIcon fill="#AAC4FF" strokeColor='#AAC4FF'/> : 
                                <HeartIcon strokeColor='#AAC4FF'/>
                            }     
                        </div> 
                    </div>
                    <div className={styles.imageContainer}><img src={photo} alt={`product ${name} # ${id}`}/></div>
                    <div className={styles.featuresBar}>
                        <div className={styles.featuresBarElement}><p>{`${gameTimeMinutes} хв`}</p></div>
                        <div className={styles.featuresBarElement}><p>{maxPlayers? `${minPlayers}-${maxPlayers} гравців`: `від ${minPlayers} гравців`}</p></div>
                        <div className={styles.featuresBarElement}><p>{`${minAge}+`}</p></div>
                    </div>
            </div>
            <div className={styles.cardBottom}>
                <div className={styles.title}><p>{name}</p></div>
                <div className={styles.prices}>
                    {configurationObject.isOldPrice && <div className={styles.price + " " + styles.oldPrice}><p>{`${oldPrice}₴`}</p></div>}
                    <div className={styles.price + " " + styles.currentPrice}><p>{`${price}₴`}</p></div>
                </div>
                <div className={styles.buyBtn}><p>Купити</p></div>
            </div>
        </div>
    );
}