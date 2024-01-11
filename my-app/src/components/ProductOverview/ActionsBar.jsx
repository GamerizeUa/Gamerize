import React, {useState} from "react";
import ShareIcon from "./icons/ShareIcon.jsx";
import HeartIcon from "./icons/HeartIcon.jsx";
import {Share} from "./Share/Share.jsx";
import styles from "./ActionsBar.module.css";

export const ActionsBar = () => {
    const [isIconFilled, setIsIconFilled] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const handleClickFavorite = () => {
        setIsIconFilled(!isIconFilled);
    };

    const changeVisibility = () => {
        setIsVisible(!isVisible);
    }

    return (
        <div className={styles.actions}>
            <div
                className={`${styles.actions_action} ${isIconFilled ? styles.actions_actionPhrase : ''}`}
                onClick={handleClickFavorite}>
                <HeartIcon isFilled={isIconFilled}/>
            </div>
            <div className={styles.actions_action} onClick={changeVisibility}>
                <ShareIcon/>
            </div>
            {isVisible && <Share changeVisibility={changeVisibility} isVisible={isVisible}/>}
        </div>
    )
}