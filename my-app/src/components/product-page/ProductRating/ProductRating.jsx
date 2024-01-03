import RateStars from "../RateStars/RateStars";
import styles from "./ProductRating.module.css"

export default function ProductRating ({feedbacks, rate}) {
    // code below counts amount of 5/4/3/2/1 stars rates and percent of 5/4/3/2/1 stars rates of total rates amount, based on feedbacks array
    let starsAmounts = [null, 0, 0, 0, 0, 0] // index is equal to 1/2/3/4/5 stars rate, value is amount of corresponding rates

    feedbacks.forEach(({rate}) => {
        if (rate === 1) starsAmounts[1]++
        else if (rate === 2) starsAmounts[2]++
        else if (rate === 3) starsAmounts[3]++
        else if (rate === 4) starsAmounts[4]++
        else if (rate === 5) starsAmounts[5]++
    });

    let starsAmountsInPercents = [ // index is equal to 1/2/3/4/5 stars rate, value is percentage of corresponding rates of total rates amount
        null,
        Math.round(starsAmounts[1] / feedbacks.length * 100),
        Math.round(starsAmounts[2] / feedbacks.length * 100),
        Math.round(starsAmounts[3] / feedbacks.length * 100),
        Math.round(starsAmounts[4] / feedbacks.length * 100),
        Math.round(starsAmounts[5] / feedbacks.length * 100),
    ]

    // counted sum of percents, to detect if it is not equal to 100%
    let starsAmountsOverallPercent = starsAmountsInPercents[1] + starsAmountsInPercents[2] + starsAmountsInPercents[3] + starsAmountsInPercents[4] + starsAmountsInPercents[5]
    if (100 !== starsAmountsOverallPercent){
        let extraPercents = 100 - starsAmountsOverallPercent 

        if (extraPercents > 0){ // if counted sum of percents is less than 100, extra percents will be added starting from higher rate in favour of product
            for (let i = starsAmountsInPercents.length - 1; i >= 1; i--){
                if (extraPercents === 0) break

                if (starsAmountsInPercents[i] < 100){
                    starsAmountsInPercents[i]++
                    extraPercents--
                }
            }
        }
        else { // else (if counted sum of percents is more than 100) extra percents will be removed starting from lower rate in favour of product
            extraPercents = -extraPercents
            for (let i = 1; i < starsAmountsInPercents.length; i++){
                if (extraPercents === 0) break

                if (starsAmountsInPercents[i] >= 1){
                    starsAmountsInPercents[i]--
                    extraPercents--
                }
            }
        }
    }
    return ( 
        <section className={styles.wrap}>
            <div className={styles.container + " container"}>
                <div className={styles.title}><p>Відгуки</p></div>
                <div className={styles.body}>
                    <div className={styles.overallRate}>
                        <div className={styles.overallDigit}><p>{rate}</p></div>
                        <div className={styles.overallStarsContainer}><RateStars filledStarsAmount={Math.round(rate)}/></div>
                    </div>
                    <div className={styles.detailedRate}>
                        <div className={styles.detailedRateString}>
                            <div className={styles.detailedRateStringLeft}>
                                <div className={styles.percentString}>
                                    <div style={{width: `${starsAmountsInPercents[5]}%`}} className={styles.currentPercent}></div>
                                </div>
                                <div className={styles.detailedStarsContainer}><RateStars/></div>
                            </div>
                            <div className={styles.percentDigit}><p>{starsAmountsInPercents[5] + '%'}</p></div>
                            <div className={styles.reviewAmount}><p>{'(' + starsAmounts[5] + ')'}</p></div>
                        </div>
                        <div className={styles.detailedRateString}>
                            <div className={styles.detailedRateStringLeft}>
                                <div className={styles.percentString}>
                                    <div style={{width: `${starsAmountsInPercents[4]}%`}} className={styles.currentPercent}></div>
                                </div>
                                <div className={styles.detailedStarsContainer}><RateStars filledStarsAmount={4}/></div>
                            </div>
                            <div className={styles.percentDigit}><p>{starsAmountsInPercents[4] + '%'}</p></div>
                            <div className={styles.reviewAmount}><p>{'(' + starsAmounts[4] + ')'}</p></div>
                        </div>
                        <div className={styles.detailedRateString}>
                            <div className={styles.detailedRateStringLeft}>
                                <div className={styles.percentString}>
                                    <div style={{width: `${starsAmountsInPercents[3]}%`}} className={styles.currentPercent}></div>
                                </div>
                                <div className={styles.detailedStarsContainer}><RateStars filledStarsAmount={3}/></div>
                            </div>
                            <div className={styles.percentDigit}><p>{starsAmountsInPercents[3] + '%'}</p></div>
                            <div className={styles.reviewAmount}><p>{'(' + starsAmounts[3] + ')'}</p></div>
                        </div>
                        <div className={styles.detailedRateString}>
                            <div className={styles.detailedRateStringLeft}>
                                <div className={styles.percentString}>
                                    <div style={{width: `${starsAmountsInPercents[2]}%`}} className={styles.currentPercent}></div>
                                </div>
                                <div className={styles.detailedStarsContainer}><RateStars filledStarsAmount={2}/></div>
                            </div>
                            <div className={styles.percentDigit}><p>{starsAmountsInPercents[2] + '%'}</p></div>
                            <div className={styles.reviewAmount}><p>{'(' + starsAmounts[2] + ')'}</p></div>
                        </div>
                        <div className={styles.detailedRateString}>
                            <div className={styles.detailedRateStringLeft}>
                                <div className={styles.percentString}>
                                    <div style={{width: `${starsAmountsInPercents[1]}%`}} className={styles.currentPercent}></div>
                                </div>
                                <div className={styles.detailedStarsContainer}><RateStars filledStarsAmount={1}/></div>
                            </div>
                            <div className={styles.percentDigit}><p>{starsAmountsInPercents[1] + '%'}</p></div>
                            <div className={styles.reviewAmount}><p>{'(' + starsAmounts[1] + ')'}</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}