import { useState } from 'react';

export const useFeedbackPagination = (feedbacks, feedbacksPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(feedbacks.length / feedbacksPerPage);

    const changePage = (newPage) => setCurrentPage(newPage);

    const currentFeedbacks = feedbacks.slice(
        (currentPage - 1) * feedbacksPerPage,
        currentPage * feedbacksPerPage
    );

    return {
        currentFeedbacks,
        currentPage,
        totalPages,
        changePage,
    };
};
