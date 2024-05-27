import styles from "./ConfirmEmailPopup.module.css";
import React, {useRef, useState} from "react";
import useNoScroll from "../../hooks/useNoScroll.js";


export const ConfirmEmailPopup = ({ setIsDisplayedLoginPopUp}) => {
    const popUpRef = useRef(null);

    const closePopupByClicking = (event) => {
        if (event.currentTarget === event.target) {
            closeConfirmEmailPop();
        }
    }

    const closeConfirmEmailPop = () => {
        popUpRef.current.style.display = "none";
    }

    const openLoginPopUp = () => {
        closeConfirmEmailPop();
        setIsDisplayedLoginPopUp(true);
    }

    return (
        <div className={styles.background} ref={popUpRef} onClick={closePopupByClicking}>
            <div className={styles.container}>
                <div className={styles.crossContainer}>
                    <div className={styles.cross} onClick={closeConfirmEmailPop}></div>
                </div>
                <p className={styles.text}>Ви успішно зареєструвались!</p>
                <button className={styles.button} onClick={openLoginPopUp}>Увійти</button>
            </div>
        </div>
    )
}