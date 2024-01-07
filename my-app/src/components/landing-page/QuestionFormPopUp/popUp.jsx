import React, {useEffect} from 'react';
import styles from './popUp.module.css'

export const PopUp = ({changeVisibility, isVisible}) => {
    useEffect(() => {
        if (isVisible) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isVisible]);

    return(
        <div className={styles.popUp_background}>
            <div className={styles.popUp}>
                <div className={styles.popUp_container}>
                    <div className={styles.popUp_crossContainer}>
                        <div className={styles.popUp_cross} onClick={changeVisibility}></div>
                    </div>
                    <p className={styles.popUp_title}>Дякуємо за запитання!</p>
                    <p className={styles.popUp_description}>Очікуйте на повідомлення від менеджера для вирішення вашого
                                                            запиту!</p>
                </div>
            </div>
        </div>
    )
}