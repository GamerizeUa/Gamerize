import styles from "./ConfirmEmailPopup.module.css";
import React, {useRef, useState} from "react";


export const ConfirmEmailPopup = ({ setIsDisplayedLoginPopUp}) => {
    const popUpRef = useRef(null);

    const closeConfirmEmailPop = () => {
        popUpRef.current.style.display = "none";
    }

    const openLoginPopUp = () => {
        popUpRef.current.style.display = "none";
        setIsDisplayedLoginPopUp(true);
    }

    return (
        <div className={styles.background} ref={popUpRef}>
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