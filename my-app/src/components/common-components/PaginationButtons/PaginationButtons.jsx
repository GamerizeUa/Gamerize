import { useState } from "react";
import styles from "./PaginationButtons.module.css";
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";
import ArrowRightIcon from "../../icons/ArrowRightIcon";

export default function PaginationButtons({
    pagesAmount = 0,
    pageChangeFunc = (newPage) => {
        // change content
        console.log(newPage);
    },
}) {
    let [currentPage, setCurrentPage] = useState(1);
    if (pagesAmount <= 1) return;

    const isLastPage = currentPage === pagesAmount;
    const isSecondToLastPage = currentPage === pagesAmount - 1;
    const isNoThirdPage = pagesAmount === 2;
    const isNoLeftArrow = currentPage === 1 || isNoThirdPage;
    const isNoRightArrow = isLastPage || isNoThirdPage;

    const leftNotCheckedBtnPage = isSecondToLastPage
        ? currentPage - 1
        : isLastPage
        ? currentPage - 2
        : currentPage + 1;
    const rightNotCheckedBtnPage = isSecondToLastPage
        ? currentPage + 1
        : isLastPage
        ? currentPage - 1
        : currentPage + 2;

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
                style={{ order: "1" }}
                onClick={leftArrowClickFunc}
                className={
                    styles.chevron +
                    " " +
                    (isNoLeftArrow ? styles.hidden_chevron : "")
                }
            >
                <ArrowLeftIcon color="#2B2B2B" strokeWidth="3" />
            </div>
            <div
                style={{
                    order: isSecondToLastPage ? "4" : isLastPage ? "6" : "2",
                }}
                className={styles.checked_btn}
            >
                <p>{currentPage}</p>
            </div>
            <p
                style={{ order: "3" }}
                onClick={() => notCheckedBtnClickFunc(leftNotCheckedBtnPage)}
                className={
                    isNoThirdPage ? styles.no_btn : styles.not_checked_btn
                }
            >
                {leftNotCheckedBtnPage}
            </p>
            <p
                style={{ order: "5" }}
                onClick={() => notCheckedBtnClickFunc(rightNotCheckedBtnPage)}
                className={styles.not_checked_btn}
            >
                {rightNotCheckedBtnPage}
            </p>
            <div
                style={{ order: "7" }}
                onClick={rightArrowClickFunc}
                className={
                    styles.chevron +
                    " " +
                    (isNoRightArrow ? styles.hidden_chevron : "")
                }
            >
                <ArrowRightIcon color="#2B2B2B" strokeWidth="3" />
            </div>
        </div>
    );
}
