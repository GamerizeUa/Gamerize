import RateStars from '../RateStars/RateStars.jsx';
import React from 'react';
import styles from './ProductDetailedRateString.module.css';

export default function ProductDetailedRateString({
    filledStarsAmount = 5,
    starsAmountInPercents = 0,
    starsAmount = 0,
}) {
    return (
        <div className={styles.detailed_rate_string}>
            <div className={styles.detailed_rate_string_left}>
                <div className={styles.percent_string}>
                    <div
                        style={{ width: `${starsAmountInPercents}%` }}
                        className={styles.current_percent}
                    ></div>
                </div>
                <div className={styles.detailed_stars_container}>
                    <RateStars filledStarsAmount={filledStarsAmount} />
                </div>
            </div>
            <p className={styles.percent_digit}>
                {starsAmountInPercents + '%'}
            </p>
            <p className={styles.review_amount}>{'(' + starsAmount + ')'}</p>
        </div>
    );
}
