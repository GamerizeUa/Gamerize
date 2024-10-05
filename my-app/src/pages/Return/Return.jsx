import { cn } from '@/utils/classnames';
import styles from './Return.module.css';
import returnPolicy from '@/assets/images/return-policy.png';

export default function Return() {
    return (
        <div className={styles['return-policy']}>
            <h2 className={styles['return-policy__title']}>Умови повернення</h2>
            <div className={styles['return-policy__container']}>
                <img
                    src={returnPolicy}
                    alt=""
                    className={styles['return-policy__img']}
                />
                <div>
                    <p className={styles['return-policy__text']}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliquaLorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </p>
                    <article
                        className={cn(
                            styles['return-policy__note'],
                            styles['note']
                        )}
                    >
                        <h3 className={styles['note__title']}>ВАЖЛИВО:</h3>
                        <p className={styles['note__body']}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqu{' '}
                        </p>
                    </article>
                    <section className={styles['return-policy__terms']}>
                        <h3 className={styles['return-policy__title']}>
                            Часові рамки повернення
                        </h3>
                        <p className={styles['return-policy__text']}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliquaLorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua.
                        </p>
                        <p className={styles['return-policy__text']}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliquaLorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua.
                        </p>
                    </section>
                    <section className={styles['return-policy__terms']}>
                        <h3 className={styles['return-policy__title']}>
                            Обмін або повернення коштів
                        </h3>
                        <p className={styles['return-policy__text']}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliquaLorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna.
                        </p>
                        <p className={styles['return-policy__text']}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliquaLorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua.
                        </p>
                    </section>
                    <section>
                        <p className={styles['return-policy__text']}>
                            <strong>
                                Товар разом з заявою встановленого зразку -
                                відправити за адресою:
                            </strong>
                        </p>
                        <p className={styles['return-policy__text']}>
                            Імя <br />
                            Телефон: +000 0000 000 <br />
                            м. [Місто], вул. , 27, <br />
                            ТОВ «НУМІС» ЄДРПОУ 44762781
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
