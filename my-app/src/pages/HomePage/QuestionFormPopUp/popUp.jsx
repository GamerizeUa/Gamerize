import React from 'react';
import styles from './popUp.module.css';
import useNoScroll from '@/hooks/useNoScroll.js';

export const PopUp = ({
    changeVisibility,
    title = 'Дякуємо за запитання!',
    info = 'Очікуйте на повідомлення від менеджера для вирішення вашого запиту!',
}) => {
    useNoScroll(true);

    const closePopupByClicking = (event) => {
        if (event.currentTarget === event.target) {
            changeVisibility();
        }
    };

    return (
        <div className={styles.popUp_background} onClick={closePopupByClicking}>
            <div className={styles.popUp}>
                <div className={styles.popUp_container}>
                    <div className={styles.popUp_crossContainer}>
                        <div
                            className={styles.popUp_cross}
                            onClick={changeVisibility}
                        ></div>
                    </div>
                    <p className={styles.popUp_title}>{title}</p>
                    <p className={styles.popUp_description}>{info}</p>
                </div>
            </div>
        </div>
    );
};
