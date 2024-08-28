import styles from "./Questions.module.css";
import sprite from "../../assets/icons/sprite.svg";
import React, {useEffect, useState} from "react";
import axios from "axios";

export const InputSearch = ({questionsState, setQuestionsState, setIsTermSearched}) => {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        findBySearchTerm();
    }, [questionsState.currentPage, searchTerm]);

    const findBySearchTerm = () => {
        if(searchTerm){
            axios.get("https://gamerize.ltd.ua/api/Question/Questions/Search",
                {params: {term: searchTerm, page: questionsState.currentPage}})
                .then((res) => {
                    setQuestionsState((prevState) => ({...prevState,
                        questions: res.data.questions,
                        totalQuestions: res.data.totalMessages,
                        totalPages: res.data.totalPages,
                        currentPage: res.data.currentPage,
                    }))
                    setIsTermSearched(true)
                })
        }else{
            setIsTermSearched(false)
        }
    }

    return (
        <div className={styles.questions_input}>
            <svg width="16" height="16">
                <use
                    href={sprite + '#icon-admin-search'}
                    fill="none">
                </use>
            </svg>
            <input
                type="text"
                placeholder="Пошук"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    )
}