import styles from './Questions.module.css'
import sprite from "../../assets/icons/sprite.svg";
import React, {useEffect, useState} from "react";
import {QuestionItem} from "./QuestionItem/QuestionItem.jsx";
import axios from "axios";
import {Pagination} from "../Pagination/Pagination.jsx";

export const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [totalQuestions, setTotalQuestions] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [questionsToDelete, setQuestionsToDelete] = useState([]);

    useEffect(() => {
        getAllQuestions();
    }, [currentPage])

    const getAllQuestions = () => {
        axios.get("https://gamerize.ltd.ua/api/Question/GetAll", {params: {page: currentPage}})
            .then((res) => {
            setQuestions(res.data.questions)
            setTotalQuestions(res.data.totalMessages)
            setTotalPages(res.data.totalPages)
            setCurrentPage(res.data.page)
        })
    }

    const deleteQuestions = () => {
        axios.delete("https://gamerize.ltd.ua/api/Question/Questions/Delete", {
            headers: {
                'Content-Type': 'application/json'
            },
            data: questionsToDelete
        })
            .then(() => {
                getAllQuestions()
                setQuestionsToDelete([])
            })
    }

    return (
        <>
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
                        <div className={styles.questions_btn_trash}
                             onClick={deleteQuestions}
                        >
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
                            <QuestionItem
                                question={question} key={i}
                                getAllQuestions={getAllQuestions}
                                setQuestionsToDelete={setQuestionsToDelete}
                                questionsToDelete={questionsToDelete}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Pagination totalItems={totalQuestions}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
            />
        </>
    )
}