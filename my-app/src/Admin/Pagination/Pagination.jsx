import styles from "./Pagination.module.css";
import React from "react";

export const Pagination = ({totalItems, totalPages, currentPage, setCurrentPage}) => {

    const setPreviousPage = () => {
        if(currentPage !== 1){
            setCurrentPage(currentPage - 1);
        }
    }

    const setNextPage = () => {
        if(currentPage !== totalPages){
            setCurrentPage(currentPage + 1);
        }
    }

    const checkLastQuestion = () => {
        const shownQuestions = currentPage * 10;
        if(shownQuestions > totalItems){
            return totalItems;
        }else{
            return shownQuestions;
        }
    }

    return (
        <div className={styles.pagination}>
            <div className={styles.pagination_pages}>
                <p>Показано {currentPage}- {checkLastQuestion()} з {totalItems}</p>
            </div>
            <div className={styles.pagination_buttons}>
                <div className={currentPage === 1 && styles.blocked}
                     onClick={setPreviousPage}
                >
                    {'<'}
                </div>
                <div className={currentPage === totalPages && styles.blocked}
                     onClick={setNextPage}
                >
                    {'>'}
                </div>
            </div>
        </div>
    )
}