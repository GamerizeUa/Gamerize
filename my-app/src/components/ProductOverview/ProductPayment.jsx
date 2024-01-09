import styles from "./ProductPayment.module.css";
import React from "react";
import NonCashPaymentIcon from "./icons/NonCashPaymentIcon.jsx";
import PostPaymentIcon from "./icons/PostPaymentIcon.jsx";

export const ProductPayment = () => {
    return (
        <div className={styles.productPayment_container}>
            <div className={styles.productPayment_method}>
                <div className={styles.productPayment_iconContainer}>
                    <NonCashPaymentIcon/>
                </div>
                <div className={styles.productPayment_info}>
                    <p className={styles.productPayment_title}>Безготівкова оплата</p>
                    <p className={styles.productPayment_description}>Оплата замовлення здійснюється на сайті під час
                                                                     оформлення</p>
                </div>
            </div>
            <div className={styles.productPayment_method}>
                <div className={styles.productPayment_iconContainer}>
                    <PostPaymentIcon/>
                </div>
                <div className={styles.productPayment_info}>
                    <p className={styles.productPayment_title}>Накладеним платежем</p>
                    <p className={styles.productPayment_description}>Ви оплачуєте замовлення після отримання:<br/>
                                                                     У відділенні перевізника (вартість послуги: "Нова
                                                                     пошта": 20 грн. + 2% від суми замовлення).
                                                                     Кур'єру при доставці (по Україні, згідно з тарифами
                                                                     перевізника).</p>
                </div>
            </div>
        </div>
    )
}