import styles from "./Pagination.module.css";
import React from "react";

export const Pagination = ({totalItems, totalPages, currentPage, setCurrentPage, itemsOnPage}) => {

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

    const checkLastItem = () => {
        const shownItems = currentPage * itemsOnPage;
        if(shownItems > totalItems){
            return totalItems;
        }else{
            return shownItems;
        }
    }

    return (
        <div className={styles.pagination}>
            <div className={styles.pagination_pages}>
                <p>Показано {currentPage}- {checkLastItem()} з {totalItems}</p>
            </div>
            <div className={styles.pagination_buttons}>
                <div className={currentPage === 1 ? styles.blocked : undefined}
                     onClick={setPreviousPage}
                >
                    {'<'}
                </div>
                <div className={currentPage === totalPages ? styles.blocked : undefined}
                     onClick={setNextPage}
                >
                    {'>'}
                </div>
            </div>
        </div>
    )
}