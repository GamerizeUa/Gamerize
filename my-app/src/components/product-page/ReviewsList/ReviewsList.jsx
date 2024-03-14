import { useEffect, useState } from "react";
import PaginationButtons from "../../common-components/PaginationButtons/PaginationButtons";
import Review from "../Review/Review";
import styles from "./ReviewsList.module.css";

export default function ReviewsList({ feedbacks }) {
    const pageLimit = 3; // amount of reviews on one page
    const pagesAmount = Math.ceil(feedbacks.length / pageLimit);
    let [reviewOffset, setReviewOffset] = useState(0); // amount of skipped reviews to get needed
    useEffect(() => {
        // get portion of feedbacks
    }, [reviewOffset]);

    function changePage(newPage) {
        setReviewOffset((newPage - 1) * pageLimit);
    }
    return (
        <section className={styles.wrap}>
            <div className={"container"}>
                {[...new Array(pageLimit)].map(
                    (_, index) =>
                        feedbacks[reviewOffset + index] && (
                            <div
                                key={feedbacks[reviewOffset + index].id}
                                className={
                                    styles.review_wrap +
                                    " " +
                                    (index !== pageLimit - 1
                                        ? styles.review_wrap_border
                                        : "")
                                }
                            >
                                <Review
                                    feedback={feedbacks[reviewOffset + index]}
                                />
                            </div>
                        )
                )}
                <div className={styles.pagination_btns_wrap}>
                    <PaginationButtons
                        pagesAmount={pagesAmount}
                        pageChangeFunc={changePage}
                    />
                </div>
            </div>
        </section>
    );
}
