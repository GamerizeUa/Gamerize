import sprite from '@/assets/icons/sprite.svg';
import React from 'react';
import styles from './QuestionItem.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { formatDate } from '@/utils/formatDate.js';

export const QuestionItem = ({
    question,
    getAllQuestions,
    setQuestionsToDelete,
    questionsToDelete,
}) => {
    const date = new Date(question.dateTime);

    const handleIconCheck = () => {
        axios
            .post(
                `https://gamerize.ltd.ua/api/Question/IsStarred/${question.id}`,
                { isStarred: !question.isStarred }
            )
            .then((res) => {
                getAllQuestions();
            })
            .catch((err) => console.log(err));
    };

    const handleCheckboxClick = () => {
        setQuestionsToDelete((prevState) =>
            prevState.includes(question.id)
                ? prevState.filter((i) => i !== question.id)
                : [...prevState, question.id]
        );
    };

    return (
        <div className={styles.question}>
            <div className={styles.question_leftPart}>
                <div className={styles.question_actions}>
                    <div
                        className={styles.question_checkbox}
                        onClick={handleCheckboxClick}
                    >
                        <span
                            className={`${
                                questionsToDelete.includes(question.id)
                                    ? styles.checked
                                    : ''
                            }`}
                        >
                            <svg width="20" height="20">
                                <use
                                    href={sprite + '#icon-admin-checked'}
                                    fill="none"
                                ></use>
                            </svg>
                        </span>
                    </div>
                    <div
                        className={styles.question_favorite}
                        onClick={handleIconCheck}
                    >
                        <svg width="22" height="22">
                            <use
                                href={sprite + '#icon-admin-favorite'}
                                fill={question.isStarred ? '#AAC4FF' : 'none'}
                            ></use>
                        </svg>
                    </div>
                </div>
            </div>
            <Link
                to={`/admin/questions/${question.id}`}
                className={`${question.answer ? styles.question_read : ''}`}
            >
                <p className={styles.question_name}>{question.userName}</p>
                <div className={styles.question_rightPart}>
                    <p className={styles.question_text}>{question.text}</p>
                    <p className={styles.question_time}>{formatDate(date)}</p>
                </div>
            </Link>
        </div>
    );
};
