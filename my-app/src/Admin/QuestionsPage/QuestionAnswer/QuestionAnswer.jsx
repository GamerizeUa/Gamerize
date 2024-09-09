import styles from "./QuestionAnswer.module.css";
import sprite from "../../../assets/icons/sprite.svg";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {formatDate} from "../../../utils/formatDate.js";
import {useSelector} from "react-redux";

export const QuestionAnswer = () => {
    const {id} = useParams();
    const [question, setQuestions] = useState({});
    const [initialsClient, setInitialsClient] = useState('');
    const [initialsManager, setInitialsManager] = useState('');
    const [dateOfQuestion, setDateOfQuestion] = useState(null);
    const [dateOfAnswer, setDateOfAnswer] = useState(null);
    const {profile} = useSelector(state => state.profile);
    const answerInputRef = useRef(null);

    useEffect(() => {
        getQuestionDetails();
    }, []);

    const getQuestionDetails = () => {
        axios.get(`https://gamerize.ltd.ua/api/Question/GetById/${id}`)
            .then((res) => {
                setQuestions(res.data);
                setDateOfQuestion(new Date(res.data.dateTime));
                setInitialsClient(res.data.userName.split(' ').map(name => name.charAt(0).toUpperCase()).join(''));
                if(res.data.answer){
                    setDateOfAnswer(new Date(res.data.answer.dateTime))
                    setInitialsManager(res.data.answer.managerName.split(' ')
                        .map(name => name.charAt(0).toUpperCase()).join(''));
                }
            })
    }

    const sendAnswer = () => {
        axios.post(`https://gamerize.ltd.ua/api/Question/Questions/${id}/Answer`,
            {managerName: profile.name, text: answerInputRef.current.value})
            .then(() => getQuestionDetails())
    }

    return(
        <div className={styles.answer}>
            <div className={styles.answer_container}>
                <div className={styles.answer_header}>
                    <p className={styles.answer_clientName}>{question.userName}</p>
                    <span>Вхідні</span>
                </div>
                <div className={styles.answer_main}>
                    <div className={styles.answer_body}>
                        <div className={styles.answer_photo}>{initialsClient}</div>
                        <div className={styles.answer_content}>
                            <div className={styles.answer_info}>
                                <div className={styles.answer_userInfo}>
                                    <p className={styles.answer_name}>{question.userName}</p>
                                    <p className={styles.answer_email}>{question.email}</p>
                                </div>
                                <p className={styles.answer_time}>{formatDate(dateOfQuestion)}</p>
                            </div>
                            <div className={styles.answer_text}>{question.text}</div>
                        </div>
                    </div>
                    {question.answer ? (
                        <>
                            <hr/>
                            <div className={styles.answer_body}>
                                <div className={styles.answer_photo}
                                     style={{backgroundColor: '#6566AC'}}>
                                    {initialsManager}
                                </div>
                                <div className={styles.answer_content}>
                                    <div className={styles.answer_info}>
                                        <div className={styles.answer_userInfo}>
                                            <p className={styles.answer_name}>{question.answer.managerName}</p>
                                        </div>
                                        <p className={styles.answer_time}>{formatDate(dateOfAnswer)}</p>
                                    </div>
                                    <div className={styles.answer_text}>{question.answer.text}</div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className={styles.reply}>
                            <div className={styles.reply_body}>
                                <div className={styles.answer_photo}
                                     style={{backgroundColor: '#6566AC'}}>
                                    {initialsManager}
                                </div>
                                <div className={styles.reply_area}>
                                    <div className={styles.reply_content}>
                                        <p className={styles.answer_email}>
                                            <svg width="16" height="16">
                                                <use
                                                    href={sprite + `#icon-admin-reply`}
                                                    fill="none">

                                                </use>
                                            </svg>
                                            {profile.name}
                                        </p>
                                        <textarea ref={answerInputRef}></textarea>
                                    </div>
                                    <button className={styles.reply_button} onClick={sendAnswer}>
                                        Відправити
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}