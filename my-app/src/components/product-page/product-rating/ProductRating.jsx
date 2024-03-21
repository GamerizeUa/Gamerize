import RateStars from "../RateStars/RateStars";
import ProductDetailedRateString from "./ProductDetailedRateString";
import styles from "./ProductRating.module.css";

export default function ProductRating({ feedbacks, rate }) {
    // code below counts amount of 5/4/3/2/1 stars rates and percent of 5/4/3/2/1 stars rates of total rates amount, based on feedbacks array
    let starsAmounts = [null, 0, 0, 0, 0, 0]; // index is equal to 1/2/3/4/5 stars rate, value is amount of corresponding rates

    feedbacks.forEach(({ rate }) => {
        if (rate === 1) starsAmounts[1]++;
        else if (rate === 2) starsAmounts[2]++;
        else if (rate === 3) starsAmounts[3]++;
        else if (rate === 4) starsAmounts[4]++;
        else if (rate === 5) starsAmounts[5]++;
    });

    let starsAmountsInPercents = [
        // index is equal to 1/2/3/4/5 stars rate, value is percentage of corresponding rates of total rates amount
        null,
        Math.round((starsAmounts[1] / feedbacks.length) * 100),
        Math.round((starsAmounts[2] / feedbacks.length) * 100),
        Math.round((starsAmounts[3] / feedbacks.length) * 100),
        Math.round((starsAmounts[4] / feedbacks.length) * 100),
        Math.round((starsAmounts[5] / feedbacks.length) * 100),
    ];

    // counted sum of percents, to detect if it is not equal to 100%
    let starsAmountsOverallPercent =
        starsAmountsInPercents[1] +
        starsAmountsInPercents[2] +
        starsAmountsInPercents[3] +
        starsAmountsInPercents[4] +
        starsAmountsInPercents[5];
    if (100 !== starsAmountsOverallPercent) {
        let extraPercents = 100 - starsAmountsOverallPercent;

        if (extraPercents > 0) {
            // if counted sum of percents is less than 100, extra percents will be added starting from higher rate in favour of product
            for (let i = starsAmountsInPercents.length - 1; i >= 1; i--) {
                if (extraPercents === 0) break;

                if (starsAmountsInPercents[i] < 100) {
                    starsAmountsInPercents[i]++;
                    extraPercents--;
                }
            }
        } else {
            // else (if counted sum of percents is more than 100) extra percents will be removed starting from lower rate in favour of product
            extraPercents = -extraPercents;
            for (let i = 1; i < starsAmountsInPercents.length; i++) {
                if (extraPercents === 0) break;

                if (starsAmountsInPercents[i] >= 1) {
                    starsAmountsInPercents[i]--;
                    extraPercents--;
                }
            }
        }
    }
    return (
        <section className={styles.wrap}>
            <div className={styles.container + " container"}>
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
