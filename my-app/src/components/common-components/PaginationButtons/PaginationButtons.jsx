import { useState } from "react";
import styles from "./PaginationButtons.module.css"
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";
import ArrowRightIcon from "../../icons/ArrowRightIcon";

export default function PaginationButtons({pagesAmount, pageReplaceFunc}) {
    let [currentPage, setCurrentPage] = useState(2)
    return (
        <div className={styles.container}>
            currentPage === 1 && <div className={styles.chevron}><ArrowLeftIcon color="#2B2B2B" width="3"/></div>
            <div className={styles.chevron}><ArrowRightIcon color="#2B2B2B" width="3"/></div>
        </div>
    );
}