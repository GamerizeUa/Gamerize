import styles from './Banner.module.css';
import presentBox from '../../../assets/images/presentBox.png';
import star from '../../../assets/images/star.svg';
import product from '../../../assets/images/product.png';

export const Banner = () => {
    return (
        <section className={styles.banner}>
            <div className={styles.banner_outerContainer + " container"}>
                <div className={styles.banner_container}>
                    <div className={styles.banner_leftPart}>
                        <div className={styles.banner_title}>
                            <p className={styles.banner_highTitle}>Зимові</p>
                            <p className={styles.banner_lowTitle}>ЗНИЖКИ</p>
                        </div>
                        <img src={presentBox} className={styles.banner_presentBox} alt="Present box"/>
                        <div className={styles.banner_starContainerThirty}>
                            <img src={star} className={styles.banner_starThirty} alt="Star"/>
                            <span className={styles.banner_starPromo}>-30%</span>
                        </div>
                    </div>
                    <div className={styles.banner_rightPart}>
                        <div className={styles.banner_starContainerFifty}>
                            <img src={star} className={styles.banner_starFifty} alt="Star"/>
                            <span className={styles.banner_starPromo}>-50%</span>
                        </div>
                        <div className={styles.banner_starContainerTwentyFive}>
                            <img src={star} className={styles.banner_starTwentyFive} alt="Star"/>
                            <span className={styles.banner_starPromo}>-25%</span>
                        </div>
                        <img src={product} className={styles.banner_product} alt="Present box"/>
                    </div>
                </div>
            </div>
        </section>
    )
}