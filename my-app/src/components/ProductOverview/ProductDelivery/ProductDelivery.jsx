import styles from './ProductDelivery.module.css'
import React from "react";
import DeliveryIcon from "../icons/DeliveryIcon.jsx";
import ReturnIcon from "../icons/ReturnIcon.jsx";

export const ProductDelivery = () => {
    return (
        <div className={styles.productDelivery_container}>
            <div className={styles.productDelivery_method}>
                <div className={styles.productDelivery_iconContainer}>
                    <DeliveryIcon/>
                </div>
                <div className={styles.productDelivery_info}>
                    <p className={styles.productDelivery_title}>Нова пошта</p>
                    <p className={styles.productDelivery_description}>Доставка здійснюється по всій Україні (Безкоштовна
                                                                      доставка при замовленні на суму 1900 грн)</p>
                </div>
            </div>
            <div className={styles.productDelivery_method}>
                <div className={styles.productDelivery_iconContainer}>
                    <DeliveryIcon/>
                </div>
                <div className={styles.productDelivery_info}>
                    <p className={styles.productDelivery_title}>Укрпошта</p>
                    <p className={styles.productDelivery_description}>Доставка здійснюється по всій Україні (Безкоштовна
                                                                      доставка при замовленні на суму 1900 грн)</p>
                </div>
            </div>
            <hr></hr>
            <div className={styles.productDelivery_method}>
                <div className={styles.productDelivery_iconContainer}>
                    <ReturnIcon/>
                </div>
                <div className={styles.productDelivery_info}>
                    <p className={styles.productDelivery_title}>Повернення</p>
                    <p className={styles.productDelivery_description}>Безкоштовне повернення протягом 14 днів з моменту
                                                                      покупки</p>
                </div>
            </div>
        </div>
    )
}