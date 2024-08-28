import styles from './Questions.module.css'
import sprite from "../../assets/icons/sprite.svg";
import React, {useEffect, useState} from "react";
import {QuestionItem} from "./QuestionItem/QuestionItem.jsx";
import axios from "axios";
import {Pagination} from "../Pagination/Pagination.jsx";
import {InputSearch} from "./InputSearch.jsx";

export const Questions = () => {
    const [questionsState, setQuestionsState] = useState({
        questions: [],
        totalQuestions: null,
        totalPages: null,
        currentPage: 1,
    });
    const [questionsToDelete, setQuestionsToDelete] = useState([]);
    const [isTermSearched, setIsTermSearched] = useState(false);
    const questionsOnPage = 10;

    useEffect(() => {
        if (!isTermSearched) {
            getAllQuestions();
        }
    }, [questionsState.currentPage, isTermSearched])

    const getAllQuestions = () => {
        axios.get("https://gamerize.ltd.ua/api/Question/GetAll",
            {params: {page: questionsState.currentPage}})
            .then((res) => {
                setQuestionsState((prevState) => ({
                    ...prevState,
                    questions: res.data.questions,
                    totalQuestions: res.data.totalMessages,
                    totalPages: res.data.totalPages,
                    currentPage: res.data.page,
                }))
            })
    }

    const setCurrentPage = (page) => {
        setQuestionsState((prevState) => ({
            ...prevState,
            currentPage: page
        }))
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
                        <InputSearch
                            questionsState={questionsState}
                            setQuestionsState={setQuestionsState}
                            setIsTermSearched={setIsTermSearched}
                        />
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
                        {questionsState.questions.map((question, i) => (
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
            <Pagination totalItems={questionsState.totalQuestions}
                        totalPages={questionsState.totalPages}
                        currentPage={questionsState.currentPage}
                        setCurrentPage={setCurrentPage}
                        itemsOnPage={questionsOnPage}
            />
        </>
    )
}