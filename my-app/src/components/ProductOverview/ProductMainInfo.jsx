import React, {useState} from 'react';
import styles from './ProductMainInfo.module.css';
import {Breadcrumbs} from "./Breadcrumbs.jsx";
import {ProductDeliveryAndPayment} from "./ProductDeliveryAndPayment.jsx";
import ShareIcon from "./icons/ShareIcon.jsx";
import HeartIcon from "./icons/HeartIcon.jsx";
import CartIcon from "./icons/CartIcon.jsx";
import CoinsHandIcon from "./icons/CoinsHandIcon.jsx";

export const ProductMainInfo = () => {
    const [isIconFilled, setIsIconFilled] = useState(false);

    const handleClick = () => {
        setIsIconFilled(!isIconFilled);
    };

    return (
        <div className={styles.productInfo}>
            <div className={styles.productInfo_container}>
                <Breadcrumbs/>
                <div className={styles.productInfo_mainPart}>
                    <div className={styles.productInfo_topPart}>
                        <div className={styles.productInfo_titleSku}>
                            <div className={styles.productInfo_title}>Кодові імена: гра слів</div>
                            <div className={styles.productInfo_sku}>Артикул: 1497490495</div>
                        </div>
                        <div className={styles.productInfo_actions}>
                            <div
                                className={`${styles.productInfo_action} 
                                ${isIconFilled ? styles.productInfo_actionPhrase : ''}`}
                                onClick={handleClick}>
                                <HeartIcon isFilled={isIconFilled}/>
                            </div>
                            <div className={styles.productInfo_action}>
                                <ShareIcon/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.productInfo_bottomPart}>
                        <div className={styles.productInfo_prices}>
                            <div className={styles.productInfo_currentPrice}>2000₴</div>
                            <div className={styles.productInfo_previousPrice}>2450₴</div>
                        </div>
                        <p className={styles.productInfo_description}>Неймовірно популярна гра для вечірок, що
                                                                      розходиться мільйонними тиражами. Гру створив
                                                                      знаменитий чеський гейм-дизайнер Владя Хватил,
                                                                      автор таких хітів як «Крізь Століття: Нова Історія
                                                                      Цивілізації», «Космічні далекобійники», «Mage
                                                                      Knight», «Dungeon Lords» і «Dungeon Petz». З
                                                                      моменту створення в 2015 році гра «Codenames» була
                                                                      визнана грою року в Німеччині, Бельгії, Японії,
                                                                      Польщі та Чехії і зайняла перші місця на конкурсах
                                                                      «The Dice Tower» і «Golden Geek». </p>
                        <div className={styles.productInfo_buyButtons}>
                            <button className={styles.productInfo_buyOneClick}>Купити в 1 клік</button>
                            <button className={styles.productInfo_addToCart}><CartIcon/>Додати в кошик</button>
                        </div>
                    </div>
                </div>
                <p className={styles.productInfo_bonuses}><CoinsHandIcon/>Отримайте 43 бонуси за покупку</p>
                <ProductDeliveryAndPayment/>
            </div>
        </div>
    )
}