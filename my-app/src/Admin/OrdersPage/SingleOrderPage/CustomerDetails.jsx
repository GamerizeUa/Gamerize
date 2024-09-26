import styles from './SingleOrderPage.module.css';

export const CustomerDetails = ({userInfo, comment}) => {

    return(
        <div className={styles.singleOrderPage_rightPart}>
            <div className={styles.singleOrderPage_detailsGroup}>
                <p className={styles.singleOrderPage_title}>Інформація про замовника </p>
                <div className={styles.singleOrderPage_details}>
                    <p>Замовник</p>
                    <p>{userInfo?.name}</p>
                </div>
                <div className={styles.singleOrderPage_details}>
                    <p>Email</p>
                    <p>{userInfo?.email}</p>
                </div>
                <div className={styles.singleOrderPage_details}>
                    <p>Телефон</p>
                    <p>{userInfo?.phoneNumber}</p>
                </div>
            </div>
            <div>
                <p className={styles.singleOrderPage_text}><b>Коментар</b></p>
                <div className={styles.singleOrderPage_comment}>{comment}</div>
            </div>
        </div>
    )
}