import styles from './Questions.module.css';
import sprite from '@/assets/icons/sprite.svg';
import React, { useEffect, useState } from 'react';
import { QuestionItem } from './QuestionItem/QuestionItem.jsx';
import { Pagination } from '../Pagination/Pagination.jsx';
import { InputSearch } from './InputSearch.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteQuestions,
    fetchQuestions,
    setCurrentPage,
} from '@/redux/questionsSlice.js';

export const Questions = () => {
    const { questions, totalQuestions, totalPages, currentPage, loading } =
        useSelector((state) => state.questions);
    const [questionsToDelete, setQuestionsToDelete] = useState([]);
    const [isTermSearched, setIsTermSearched] = useState(false);
    const questionsOnPage = 10;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isTermSearched) {
            getAllQuestions();
        }
    }, [currentPage, isTermSearched]);

    const getAllQuestions = () => {
        dispatch(fetchQuestions());
    };

    const deleteQuestionsHandler = () => {
        dispatch(deleteQuestions(questionsToDelete)).then(() => {
            setQuestionsToDelete([]);
            dispatch(fetchQuestions());
        });
    };

    return (
        <>
            <div className={styles.questions}>
                <div className={styles.questions_container}>
                    <div className={styles.questions_header}>
                        <InputSearch setIsTermSearched={setIsTermSearched} />
                        <div
                            className={styles.questions_btn_trash}
                            onClick={deleteQuestionsHandler}
                        >
                            <svg width="16" height="16">
                                <use
                                    href={sprite + '#icon-admin-trash'}
                                    fill="none"
                                ></use>
                            </svg>
                        </div>
                    </div>
                    <div className={styles.questions_content}>
                        {questions.map((question, i) => (
                            <QuestionItem
                                question={question}
                                key={i}
                                getAllQuestions={getAllQuestions}
                                setQuestionsToDelete={setQuestionsToDelete}
                                questionsToDelete={questionsToDelete}
                            />
                        ))}
                        {}
                        {questions.length === 0 && loading && (
                            <p className={styles.questions_text}>
                                Завантаження питань...
                            </p>
                        )}
                        {questions.length === 0 && !loading && (
                            <p className={styles.questions_text}>
                                Запитань за запитом не знайдено!
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <Pagination
                totalItems={totalQuestions}
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={(nextPage) =>
                    dispatch(setCurrentPage(nextPage))
                }
                itemsOnPage={questionsOnPage}
            />
        </>
    );
};
