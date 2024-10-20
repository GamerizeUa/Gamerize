import styles from './AboutUs.module.css';
import Anton from '@/assets/images/team/anton.jpg';
import Oleksandr from '@/assets/images/team/oleksandr.jpg';
import NastiaDev from '@/assets/images/team/nastiaDev.jpg';
import Mykhailo from '@/assets/images/team/mykhailo.jpg';
import Vitaliia from '@/assets/images/team/vitaliia.jpg';
import Vladyslav from '@/assets/images/team/vladyslav.jpg';
import Daria from '@/assets/images/team/daria.png';
import Bogdan from '@/assets/images/team/bogdan.jpg';
import NastiaQA from '@/assets/images/team/nastiaQA.jpg';
import Julia from '@/assets/images/team/julia.jpg';
import Grygorii from '@/assets/images/team/grygorii.jpg';
import Natalia from '@/assets/images/team/natalia.jpg';


export default function AboutUs() {
    const teamMembers = [
        {
            name: 'Тончакова Наталя',
            link: 'https://www.linkedin.com/in/natalia-tonkachova-866b8b27a/',
            position: 'Project manager',
            image: Natalia
        },
        {
            name: 'Гулак Михайло',
            link: 'https://www.linkedin.com/in/mykhailo-hulak-36bb68308/',
            position: 'Frontend developer',
            image: Mykhailo
        },
        {
            name: 'М\'яновська Анастасія',
            link: 'https://www.linkedin.com/in/anastasiia-mianovska-3084a7281/',
            position: 'Frontend developer',
            image: NastiaDev
        },
        {
            name: 'Овечко Віталія ',
            link: 'https://www.linkedin.com/in/vitaliya-%D0%BEvechko/',
            position: 'Frontend developer',
            image: Vitaliia
        },
        {
            name: 'Любашенко Влад ',
            link: 'https://www.linkedin.com/in/dr-vladson-1b868828b/',
            position: 'Frontend developer',
            image: Vladyslav
        },
        {
            name: 'Кисленко Дар\'я',
            link: 'https://www.linkedin.com/in/daria-kyslenkoo/',
            position: 'UI/UX Designer',
            image: Daria
        },
        {
            name: 'Богдан',
            link: '',
            position: 'UI/UX Designer',
            image: Bogdan
        },
        {
            name: 'Гуцул Олександр',
            link: 'https://www.linkedin.com/in/oleksandr-hutsul-5b2b95254/',
            position: 'Backend developer',
            image: Oleksandr
        },
        {
            name: 'Пальчик Антон',
            link: 'https://www.linkedin.com/in/anthony-palchyk',
            position: 'Backend developer',
            image: Anton
        },
        {
            name: 'Постільняк Анастасія',
            link: 'https://www.linkedin.com/in/anastasiia-postilniak/',
            position: 'QA engineer',
            image: NastiaQA
        },
        {
            name: 'Маркитан Юлія',
            link: 'https://linkedin.com/in/yuliia-markytan',
            position: 'QA engineer',
            image: Julia
        },
        {
            name: 'Разенков Григорій',
            link: 'https://www.linkedin.com/in/grygorii-razenkov-57b16028a/\n',
            position: 'QA engineer',
            image: Grygorii
        },
    ]

    return (
        <div className={styles['about']}>
            <div className="container">
                <div className={styles['about__container']}>
                    <h1 className={styles['about__title']}>Про нас</h1>
                    <div className={styles['about__content']}>
                        <p className={styles['about__text']}>Команда, яка створила сайт</p>
                        <div className={styles['about__cards']}>
                            {teamMembers.map((member, index) => (
                                <div>
                                    <div key={index} className={styles['about__card']}>
                                        <div className={styles['about__image__container']}>
                                            <img src={member.image} alt={member.name}
                                                 className={styles['about__image']}/>
                                        </div>
                                        <div className={styles['about__info']}>
                                            <p className={styles['about__name']}>{member.name}</p>
                                            <div>
                                                <p className={styles['about__position']}>{member.position}</p>
                                                <a href={member.link} className={styles['about__position']}>Linkedin</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}
