import sprite from "../../../assets/icons/sprite.svg";
import React, {useState} from "react";
import styles from "./QuestionItem.module.css";

export const QuestionItem = ({ question }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const date = new Date(question.dateTime);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    const formatDate = (date) => {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        };

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        if (isToday) {
            return `${hours}:${minutes}`;
        } else {
            return date.toLocaleDateString('en-GB', options);
        }
    };

    const handleIconCheck = () => {
        setIsFavorite(prevState => !prevState);
    }

    const handleCheckboxClick = () => {
        setIsChecked(prevState => !prevState);
    }

    return(
        <div className={styles.question}>
            <div className={styles.question_leftPart}>
                <div className={styles.question_actions}>
                    <div className={styles.question_checkbox} onClick={handleCheckboxClick}>
                        <span className={`${isChecked ? styles.checked : ''}`}>
                            <svg width="20" height="20">
                            <use
                                href={sprite + '#icon-admin-checked'}
                                fill='none'>
                            </use>
                        </svg>
                        </span>
                    </div>
                    <div className={styles.question_favorite} onClick={handleIconCheck}>
                        <svg width="22" height="22">
                            <use
                                href={sprite + '#icon-admin-favorite'}
                                fill= {isFavorite ? '#AAC4FF' : 'none'}>
                            </use>
                        </svg>
                    </div>
                </div>
                <p className={styles.question_name}>{question.userName}</p>
            </div>
            <div className={styles.question_centerPart}>
                <p className={styles.question_text}>{question.text}</p>
            </div>
            <div className={styles.question_rightPart}>
                <p className={styles.question_time}>{formatDate(date)}</p>
            </div>
        </div>
    )
}