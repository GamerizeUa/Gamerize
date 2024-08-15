import styles from './Questions.module.css'
import sprite from "../../assets/icons/sprite.svg";
import React, {useEffect, useState} from "react";
import {QuestionItem} from "./QuestionItem/QuestionItem.jsx";
import axios from "axios";
import {Link} from "react-router-dom";

export const Questions = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axios.get("https://gamerize.ltd.ua/api/Question/GetAll").then((res) => setQuestions(res.data.questions))
    }, [])

    return(
        <div className={styles.questions}>
            <div className={styles.questions_container}>
                <div className={styles.questions_header}>
                    <div className={styles.questions_input}>
                        <svg width="16" height="16">
                            <use
                                href={sprite + '#icon-admin-search'}
                                fill="none">
                            </use>
                        </svg>
                        <input type="text" placeholder="Пошук"/>
                    </div>
                    <div className={styles.questions_btn_trash}>
                        <svg width="16" height="16">
                            <use
                                href={sprite + '#icon-admin-trash'}
                                fill="none">
                            </use>
                        </svg>
                    </div>
                </div>
                <div className={styles.questions_content}>
                    {questions.map((question, i) => (
                        <Link to='/' key={i}>
                            <QuestionItem question={question} />
                        </Link>
                    ))}
                </div>
            </div>
            <div className={styles.questions_pagination}></div>
        </div>
    )
}