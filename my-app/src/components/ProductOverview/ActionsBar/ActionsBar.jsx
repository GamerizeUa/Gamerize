import React, {useState} from "react";
import ShareIcon from "../icons/ShareIcon.jsx";
import HeartIcon from "../icons/HeartIcon.jsx";
import styles from "./ActionsBar.module.css";

export const ActionsBar = () => {
    const [isIconFilled, setIsIconFilled] = useState(false);

    const handleClickFavorite = () => {
        setIsIconFilled(!isIconFilled);
    };

    return (
        <div className={styles.actions}>
            <div
                className={`${styles.actions_action} ${isIconFilled ? styles.actions_actionPhrase : ''}`}
                onClick={handleClickFavorite}>
                <HeartIcon isFilled={isIconFilled}/>
            </div>
            <div className={styles.actions_action}>
                <ShareIcon/>
            </div>
        </div>
    )
}