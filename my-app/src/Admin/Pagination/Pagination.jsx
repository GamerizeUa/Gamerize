import styles from "./Pagination.module.css";
import React from "react";

export const Pagination = ({}) => {

    return (
        <div className={styles.pagination}>
            <div className={styles.pagination_pages}>
                <p>Показано 1- 09 з 178</p>
            </div>
            <div className={styles.pagination_buttons}>
                <div className={styles.blocked}>{'<'}</div>
                <div>{'>'}</div>
            </div>
        </div>
    )
}