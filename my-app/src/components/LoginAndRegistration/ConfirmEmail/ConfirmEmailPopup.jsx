import styles from './ConfirmEmailPopup.module.css';
import React, { useRef } from 'react';
import { assignIsDisplayedLoginPopUp } from '@/redux/formsDisplaying.js';
import { useDispatch } from 'react-redux';

export const ConfirmEmailPopup = () => {
    const popUpRef = useRef(null);
    const dispatch = useDispatch();

    const closePopupByClicking = (event) => {
        if (event.currentTarget === event.target) {
            closeConfirmEmailPop();
        }
    };

    const closeConfirmEmailPop = () => {
        popUpRef.current.style.display = 'none';
    };

    const openLoginPopUp = () => {
        closeConfirmEmailPop();
        dispatch(assignIsDisplayedLoginPopUp(true));
    };

    return (
        <div
            className={styles.background}
            ref={popUpRef}
            onClick={closePopupByClicking}
        >
            <div className={styles.container}>
                <div className={styles.crossContainer}>
                    <div
                        className={styles.cross}
                        onClick={closeConfirmEmailPop}
                    ></div>
                </div>
                <p className={styles.text}>Ви успішно зареєструвались!</p>
                <button className={styles.button} onClick={openLoginPopUp}>
                    Увійти
                </button>
            </div>
        </div>
    );
};
