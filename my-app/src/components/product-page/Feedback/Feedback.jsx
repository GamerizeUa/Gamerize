import RateStars from '../RateStars/RateStars';
import styles from './Feedback.module.css';

export default function Feedback({
    feedback: {
        customerName = 'Anonim',
        text,
        createdDate = '2001-09-11',
        rate = 5,
    },
}) {
    const dateElements = createdDate.split('-');
    const nameElements = customerName.split(' ');
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    return (
        <div className={styles.container}>
            <div
                style={{ backgroundColor: getRandomColor() }}
                className={styles.user_avatar}
            >
                <p>{`${nameElements[0][0]}.${
                    nameElements[1] ? nameElements[1][0] : ''
                }`}</p>
            </div>
            <div className={styles.body}>
                <div className={styles.name_date_container}>
                    <p className={styles.name}>{customerName}</p>
                    <p className={styles.date}>
                        {`${dateElements[2].slice(0, 2)}.${dateElements[1]}.${
                            dateElements[0]
                        }`}
                    </p>
                </div>
                <div className={styles.stars_container}>
                    <RateStars filledStarsAmount={rate} />
                </div>
                <p className={styles.text}>{text}</p>
            </div>
        </div>
    );
}
