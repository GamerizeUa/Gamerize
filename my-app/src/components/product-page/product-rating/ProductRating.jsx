import { useContext } from 'react';
import { ProductContext } from '../Product';
import RateStars from '../RateStars/RateStars';
import ProductDetailedRateString from './ProductDetailedRateString';
import styles from './ProductRating.module.css';

const getRatingFromFeedbacks = (feedbacks) => {
    if (feedbacks.length === 0) return 0;

    let rates = 0;

    for (let feedback of feedbacks) {
        rates += feedback.rate;
    }
    return Math.round(rates / feedbacks.length);
};

const getStarsAmount = (rates) => {
    const amount = {};

    for (const rate of rates) {
        amount[rate] = amount[rate] ? amount[rate] + 1 : 1;
    }

    return amount;
};

const getStarsAmountsInPercents = (amount) => {
    const percents = {};

    const sum = Object.values(amount).reduce(
        (sum, current) => sum + current,
        0
    );

    let totalPercents = 0;
    let maxRate = null;
    let maxPercent = 0;

    for (const rate in amount) {
        percents[rate] = Math.round((amount[rate] / sum) * 100);
        totalPercents += percents[rate];

        if (percents[rate] > maxPercent) {
            maxPercent = percents[rate];
            maxRate = rate;
        }
    }

    if (totalPercents !== 100 && maxRate !== null) {
        percents[maxRate] += 100 - totalPercents;
    }

    return percents;
};

export default function ProductRating() {
    const { feedbacks } = useContext(ProductContext);
    const rating = getRatingFromFeedbacks(feedbacks);
    let starsAmount = getStarsAmount(
        feedbacks.map((feedback) => feedback.rate)
    );
    let starsAmountsInPercents = getStarsAmountsInPercents(starsAmount);

    const renderRateString = (rate, index) => (
        <ProductDetailedRateString
            filledStarsAmount={rate}
            starsAmount={starsAmount[rate]}
            starsAmountInPercents={starsAmountsInPercents[rate]}
            key={index}
        />
    );

    return (
        <section className={styles.wrap}>
            <div className={styles.container}>
                <h2 className={styles.title}>Відгуки</h2>
                <div className={styles.body}>
                    <div className={styles.overall_rate}>
                        <p className={styles.overall_digit}>{rating}</p>
                        <div className={styles.overall_stars_container}>
                            <RateStars filledStarsAmount={Math.round(rating)} />
                        </div>
                    </div>
                    <div className={styles.detailed_rate}>
                        {[5, 4, 3, 2, 1].map(renderRateString)}
                    </div>
                </div>
            </div>
        </section>
    );
}
