import { useState } from "react";
import styles from "./PaginationButtons.module.css"
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";
import ArrowRightIcon from "../../icons/ArrowRightIcon";

export default function PaginationButtons({pagesAmount, pageChangeFunc}) {
    let [currentPage, setCurrentPage] = useState(1)
    function rightArrowClickFunc (){
        pageChangeFunc(currentPage + 1)
        setCurrentPage(currentPage + 1)
    } 
    function leftArrowClickFunc (){
        pageChangeFunc(currentPage - 1)
        setCurrentPage(currentPage - 1)
    }
    function notCheckedBtnClickFunc (newPage){
        pageChangeFunc(newPage)
        setCurrentPage(newPage)
    } 
    return (
        <div className={styles.container}>
            <div onClick={leftArrowClickFunc} className={styles.chevron + " " +  (currentPage !== 1? "" : styles.hiddenChevron)}><ArrowLeftIcon color="#2B2B2B" strokeWidth="3"/></div>
            <div className={styles.checkedBtn}><p>{currentPage}</p></div>
            <div onClick={()=> notCheckedBtnClickFunc(currentPage + 1)} className={styles.notCheckedBtn}><p>{currentPage + 1}</p></div>
            <div onClick={()=> notCheckedBtnClickFunc(currentPage + 2)} className={styles.notCheckedBtn}><p>{currentPage + 2}</p></div>
            <div onClick={rightArrowClickFunc} className={styles.chevron + " " + (currentPage !== pagesAmount? "" : styles.hiddenChevron)}><ArrowRightIcon color="#2B2B2B" strokeWidth="3"/></div>
        </div>
    );
}