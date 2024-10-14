import { useContext } from 'react';
import { ProductContext } from '../Product.jsx';
import { useFeedbackPagination } from '@/hooks/useFeedbacksPagination.js';
import PaginationButtons from '@/components/PaginationButtons/PaginationButtons.jsx';
import Feedback from '../Feedback/Feedback.jsx';
import styles from './FeedbackList.module.css';

export default function FeedbackList() {
    const feedbacksPerPage = 3;
    const { feedbacks: reviews } = useContext(ProductContext);
    const {
        currentFeedbacks: currentReviews,
        totalPages: pagesAmount,
        changePage,
        currentPage,
    } = useFeedbackPagination(reviews, feedbacksPerPage);

    return (
        <section className={styles.feedbacks}>
            {currentReviews.map((review, index) => {
                return (
                    <div
                        key={index}
                        className={
                            index !== feedbacksPerPage - 1 &&
                            index !== currentReviews.length - 1
                                ? styles.feedback_border
                                : ''
                        }
                    >
                        <Feedback feedback={review} />
                    </div>
                );
            })}
            <div className={styles.pagination_btn_group}>
                <PaginationButtons
                    pagesAmount={pagesAmount}
                    currentPage={currentPage}
                    pageChangeFunc={changePage}
                />
            </div>
        </section>
    );
}
