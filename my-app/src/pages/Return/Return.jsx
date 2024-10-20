import { cn } from '@/utils/classnames';
import styles from './Return.module.css';
import returnPolicy from '@/assets/images/return-policy.png';
import useScrollToTop from "@/hooks/useScrollToTop.js";

export default function Return() {
    useScrollToTop();

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
                        Ми прагнемо, щоб кожен покупець був задоволений своїм
                        замовленням у нашому онлайн-магазині настільних ігор.
                        Якщо з будь-якої причини ви не задоволені покупкою, у
                        вас є можливість повернути товар протягом 14 днів з
                        моменту його отримання.
                    </p>
                    <article
                        className={cn(
                            styles['return-policy__note'],
                            styles['note']
                        )}
                    >
                        <h3 className={styles['note__title']}>ВАЖЛИВО:</h3>
                        <p className={styles['note__body']}>
                            Товар повинен бути в оригінальній упаковці, без
                            слідів використання, збережені всі елементи та
                            комплектуючі.
                        </p>
                    </article>
                    <section className={styles['return-policy__terms']}>
                        <h3 className={styles['return-policy__title']}>
                            Часові рамки повернення
                        </h3>
                        <p className={styles['return-policy__text']}>
                            Для оформлення повернення необхідно пред’явити чек
                            або інший документ, що підтверджує покупку. Якщо
                            товар не відповідає товарним вимогам, ми залишаємо
                            за собою право відмовити у поверненні.
                        </p>
                        <p className={styles['return-policy__text']}>
                            Після отримання поверненого товару, повернення
                            коштів буде здійснено протягом 7 робочих днів.
                        </p>
                    </section>
                    <section className={styles['return-policy__terms']}>
                        <h3 className={styles['return-policy__title']}>
                            Обмін або повернення коштів
                        </h3>
                        <p className={styles['return-policy__text']}>
                            Ми завжди прагнемо забезпечити найкращий сервіс для
                            наших клієнтів. Якщо ви виявили дефект у товарі або
                            з якоїсь причини хочете його повернути, ми
                            пропонуємо два варіанти: обмін або повернення
                            коштів. Ви можете обміняти товар на аналогічний або
                            інший товар, якщо він доступний на складі. Обмін
                            можливий протягом 14 днів з моменту отримання
                            покупки, за умови, що товар не був у використанні та
                            збережені всі комплектуючі.
                        </p>
                        <p className={styles['return-policy__text']}>
                            Якщо ви бажаєте повернути товар, ми повернемо вам
                            повну вартість покупки після отримання та перевірки
                            товару. Для початку процесу обміну або повернення
                            зв'яжіться з нашою службою підтримки, вказавши номер
                            замовлення та деталі проблеми.
                        </p>
                        <p className={styles['return-policy__text']}>
                            Повернення коштів здійснюється протягом 7 робочих
                            днів після підтвердження, що товар відповідає умовам
                            повернення (не був у використанні, збережена
                            оригінальна упаковка, всі елементи на місці).
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
