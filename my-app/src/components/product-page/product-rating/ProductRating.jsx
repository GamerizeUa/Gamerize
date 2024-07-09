import { useContext } from 'react';
import RateStars from '../RateStars/RateStars';
import ProductDetailedRateString from './ProductDetailedRateString';
import styles from './ProductRating.module.css';
import { ProductContext } from '../Product';

const getRatingFromFeedbacks = (feedbacks) => {
    if (feedbacks.length === 0) return 0;

    let ratings = 0;

    for (let feedback of feedbacks) {
        ratings += feedback.rate;
    }
    return Math.round(ratings / feedbacks.length);
};

const getStarsAmount = (ratings) => {
    const amount = {};

    for (const rate of ratings) {
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
    const rate = getRatingFromFeedbacks(feedbacks);
    let starsAmounts = getStarsAmount(
        feedbacks.map((feedback) => feedback.rate)
    );
    let starsAmountsInPercents = getStarsAmountsInPercents(starsAmounts);

    return (
        <section className={styles.wrap}>
            <div className={styles.container + ' container'}>
                <p className={styles.title}>Відгуки</p>
                <div className={styles.body}>
                    <div className={styles.overall_rate}>
                        <p className={styles.overall_digit}>{rate}</p>
                        <div className={styles.overall_stars_container}>
                            <RateStars filledStarsAmount={Math.round(rate)} />
                        </div>
                    </div>
                    <div className={styles.detailed_rate}>
                        <ProductDetailedRateString
                            filledStarsAmount={5}
                            starsAmount={starsAmounts[5]}
                            starsAmountInPercents={starsAmountsInPercents[5]}
                        />
                        <ProductDetailedRateString
                            filledStarsAmount={4}
                            starsAmount={starsAmounts[4]}
                            starsAmountInPercents={starsAmountsInPercents[4]}
                        />
                        <ProductDetailedRateString
                            filledStarsAmount={3}
                            starsAmount={starsAmounts[3]}
                            starsAmountInPercents={starsAmountsInPercents[3]}
                        />
                        <ProductDetailedRateString
                            filledStarsAmount={2}
                            starsAmount={starsAmounts[2]}
                            starsAmountInPercents={starsAmountsInPercents[2]}
                        />
                        <ProductDetailedRateString
                            filledStarsAmount={1}
                            starsAmount={starsAmounts[1]}
                            starsAmountInPercents={starsAmountsInPercents[1]}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
