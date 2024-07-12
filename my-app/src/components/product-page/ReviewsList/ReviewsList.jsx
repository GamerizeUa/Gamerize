import { useContext, useEffect, useState } from 'react';
import PaginationButtons from '../../common-components/PaginationButtons/PaginationButtons';
import Review from '../Review/Review';
import styles from './ReviewsList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    getReviewsPortionAsync,
    selectReviews,
    selectProductId,
    setProductId,
    clearReviews,
    selectTotalPages,
} from '../../../redux/reviewsSlice';
import { ProductContext } from '../Product';

export default function ReviewsList() {
    const { id: productId } = useContext(ProductContext);
    const dispatch = useDispatch();
    const reviews = useSelector(selectReviews);
    const prodId = useSelector(selectProductId);
    const pagesAmount = useSelector(selectTotalPages);
    const pageSize = 3; // amount of reviews on one page
    let [page, setPage] = useState(1);
    useEffect(() => {
        if (prodId !== productId) {
            dispatch(setProductId(productId));
            dispatch(clearReviews());
        }
        if (!reviews[page - 1]) {
            dispatch(getReviewsPortionAsync({ productId, page, pageSize }));
        }
    }, [page, dispatch, prodId, productId, reviews]);
    const currentReviews = reviews[page - 1] || [];

    function changePage(newPage) {
        setPage(newPage);
    }
    return (
        <section className={styles.wrap}>
            <div className={'container'}>
                {currentReviews.map((review, index) => {
                    return (
                        <div
                            key={review.id}
                            className={
                                styles.review_wrap +
                                ' ' +
                                (index !== pageSize - 1 &&
                                index !== currentReviews.length - 1
                                    ? styles.review_wrap_border
                                    : '')
                            }
                        >
                            <Review feedback={review} />
                        </div>
                    );
                })}
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
