import { useState } from "react";
import styles from "./PaginationButtons.module.css";
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";
import ArrowRightIcon from "../../icons/ArrowRightIcon";

export default function PaginationButtons({ pagesAmount, pageChangeFunc }) {
    let [currentPage, setCurrentPage] = useState(1);
    function rightArrowClickFunc() {
        pageChangeFunc(currentPage + 1);
        setCurrentPage(currentPage + 1);
    }
    function leftArrowClickFunc() {
        pageChangeFunc(currentPage - 1);
        setCurrentPage(currentPage - 1);
    }
    function notCheckedBtnClickFunc(newPage) {
        pageChangeFunc(newPage);
        setCurrentPage(newPage);
    }
    return (
        <div className={styles.container}>
            <div
                onClick={leftArrowClickFunc}
                className={
                    styles.chevron +
                    " " +
                    (currentPage !== 1 ? "" : styles.hidden_chevron)
                }
            >
                <ArrowLeftIcon color="#2B2B2B" strokeWidth="3" />
            </div>
            <div className={styles.checked_btn}>
                <p>{currentPage}</p>
            </div>
            <p
                onClick={() => notCheckedBtnClickFunc(currentPage + 1)}
                className={styles.not_checked_btn}
            >
                {currentPage + 1}
            </p>
            <p
                onClick={() => notCheckedBtnClickFunc(currentPage + 2)}
                className={styles.not_checked_btn}
            >
                {currentPage + 2}
            </p>
            <div
                onClick={rightArrowClickFunc}
                className={
                    styles.chevron +
                    " " +
                    (currentPage !== pagesAmount ? "" : styles.hidden_chevron)
                }
            >
                <ArrowRightIcon color="#2B2B2B" strokeWidth="3" />
            </div>
        </div>
    );
}
