import styles from './ProductCard.module.css'
import HeartBlueIcon from "../icons/HeartBlueIcon";

export default function ProductCard({configurationObject = {isOldPrice : false, isDiscount : false, isCartView : false}, product : {id,discount, name, minPlayers, maxPlayers, minAge, price, oldPrice, gameTimeMinutes,photo}}) {
    return (
        <div className={styles.allContent}>
            <div className={styles.cardTop}>
                    <div className={styles.iconsBar}>
                        {
                            configurationObject.isDiscount?
                            <div className={styles.leftIcon + " " + styles.discountIcon}><p>{`-${discount}%`}</p></div>
                            : <div className={styles.leftIcon + " " + styles.hitIcon}><p>Хіт</p></div>
                        }
                        <div className={styles.wishListIcon}><HeartBlueIcon/></div> 
                    </div>
                    <div className={styles.imageContainer}><img src={photo} alt={`product ${name} # ${id}`}/></div>
                    <div className={styles.featuresBar}>
                        <div className={styles.featuresBarElement}><p>{`${gameTimeMinutes} хв`}</p></div>
                        <div className={styles.featuresBarElement}><p>{maxPlayers? `${minPlayers}-${maxPlayers} гравців`: `від ${minPlayers} гравців`}</p></div>
                        <div className={styles.featuresBarElement}><p>{`${minAge}+`}</p></div>
                    </div>
            </div>
            <div className={styles.cardBottom}>
                <div className={styles.title}><h6>{name}</h6></div>
                <div className={styles.prices}>
                    {configurationObject.isOldPrice && <div className={styles.price + " " + styles.oldPrice}><p>{`${oldPrice}₴`}</p></div>}
                    <div className={styles.price + " " + styles.currentPrice}><p>{`${price}₴`}</p></div>
                </div>
                <div className={styles.buyBtn}><p>Купити</p></div>
            </div>
        </div>
    );
}