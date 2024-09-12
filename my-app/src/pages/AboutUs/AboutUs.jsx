import styles from './AboutUs.module.css';
import imageAboutUs from '../../assets/images/about_us_photo.png';
import sprite from '../../assets/icons/sprite.svg';
import { cn } from '../../utils/classnames';

const ItemList = ({ isColumn, className, children }) => {
    return (
        <ul
            className={
                isColumn
                    ? cn(styles['column'], className)
                    : cn(styles['row'], className)
            }
        >
            {children}
        </ul>
    );
};

ItemList.Card = function Card({ icon, title, text }) {
    return (
        <li className={styles.card}>
            {icon && (
                <svg className={styles['card__icon']}>
                    <use
                        href={`${sprite}#${icon}`}
                        fill="#EEF1FF"
                        stroke="currentColor"
                    ></use>
                </svg>
            )}

            {title && <p className={styles['card__title']}>{title}</p>}
            <p className={styles['card__text']}>{text}</p>
        </li>
    );
};

ItemList.Link = function Link({ title, href, linkText }) {
    return (
        <li className={styles.item}>
            {title && <p className={styles['item__title']}>{title}</p>}
            <a href={href} className={styles['item__link']}>
                {linkText}
            </a>
        </li>
    );
};

export default function AboutUs() {
    const cardsInfo = {
        advantages: [
            { id: 1, icon: 'icon-star', text: 'Висока якість' },
            {
                id: 2,
                icon: 'icon-package',
                text: 'Швидка доставка',
            },
            { id: 3, icon: 'icon-wallet', text: 'Доступні ціни' },
        ],
        features: [
            {
                id: 4,
                title: '19000+',
                text: 'Задоволених клієнтів',
            },
            { id: 5, title: '34000+', text: 'Проданих ігор' },
            { id: 6, title: '25+', text: 'Років на ринку' },
        ],
    };

    const contacts = [
        {
            title: 'Електронна пошта: ',
            href: 'mailto:info@gamerise@gmail.com',
            linkText: 'info@gamerise@gmail.com',
        },
        {
            title: 'Телефон',
            link: 'tel:+380 98 7067 447',
            linkText: '+380 98 7067 447',
        },
    ];

    return (
        <div className={styles.about}>
            <h1 className={styles['about__title']}>Про нас</h1>
            <div className={styles['about__container']}>
                <div>
                    <p className={styles['about__text']}>
                        Ми – команда ентузіастів, яка вірить у силу ігор для
                        об'єднання сімей, друзів та колег. Ми прагнемо зробити
                        доступними найкращі настільні ігри для всіх. Наш магазин
                        – це не просто торгова платформа, але і вірний союзник у
                        вашому пошуку найцікавіших, найзахоплюючіших та
                        найсучасніших настільних ігор.
                    </p>
                    <p className={styles['about__text']}>
                        У нас ви знайдете широкий вибір настільних ігор для
                        будь-якого віку та ігрового смаку. Від класичних
                        настільних ігор, що запам'ятовуються з дитинства, до
                        новітніх стратегічних ігор, які випробовують ваші
                        розумові здібності.
                    </p>

                    <p className={styles['about__text']}>
                        Ми віримо в те, що настільні ігри – це не просто забава,
                        але й чудовий спосіб зближення людей. Ми прагнемо робити
                        ваші моменти гри незабутніми та наповненими радістю.
                        Обирайте якість, вибирайте розвагу, обирайте наш онлайн
                        магазин настільних ігор – ваш вірний партнер у світі
                        ігор та неперевершеного відпочинку!
                    </p>

                    <h2 className={styles['about__title']}>Наші переваги</h2>
                    <ItemList
                        className={cn(
                            styles['about__advantages'],
                            styles['row--space-evenly']
                        )}
                    >
                        {cardsInfo.advantages.map((advantage) => (
                            <ItemList.Card {...advantage} key={advantage.id} />
                        ))}
                    </ItemList>
                    <ItemList
                        className={cn(
                            styles['about__features'],
                            styles['row--space-between']
                        )}
                    >
                        {cardsInfo.features.map((feature) => (
                            <ItemList.Card {...feature} key={feature.id} />
                        ))}
                    </ItemList>

                    <div className={styles['about__location']}>
                        <h3 className={styles['about__title']}>
                            Де нас знайти?
                        </h3>
                        <p className={styles['about__text']}>
                            Ми очікуємо на ваш візит та впевнені, що разом ми
                            знайдемо ідеальну гру для вашого найкращого вечора в
                            колі друзів та рідних!
                        </p>
                        <ItemList isColumn>
                            <ItemList.Link
                                linkText={
                                    'Вулиця Гравецька, 42, Місто, Країна,  Індекс: 12345'
                                }
                            />
                        </ItemList>
                    </div>

                    <div className={styles['about__contacts']}>
                        <h3 className={styles['about__title']}>
                            Наш контактний центр:
                        </h3>

                        <ItemList isColumn>
                            {contacts.map((contact, id) => (
                                <ItemList.Link {...contact} key={id} />
                            ))}
                        </ItemList>
                    </div>
                </div>
                <img
                    className={styles['about__img']}
                    src={imageAboutUs}
                    alt="About Us"
                />
            </div>
        </div>
    );
}
