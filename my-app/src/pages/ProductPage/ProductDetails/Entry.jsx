import styles from './ProductDetails.module.css';

export const Entry = ({ title, body }) => {
    const translateKey = (key) => {
        const translations = {
            playersQuantity: 'Кількість гравців',
            age: 'Вік',
            gameTime: 'Час гри',
            language: 'Мова',
            category: 'Категорії',
        };
        return translations[key] || key;
    };

    // if (title == 'equipment') {
    //     return (
    //         <div className={styles.entry}>
    //             <p className={styles['entry__title']}>Компектація</p>
    //             <ul className={styles['entry__body']}>
    //                 {body.map((item, index) => (
    //                     <li key={index}>{item}</li>
    //                 ))}
    //             </ul>
    //         </div>
    //     );
    // }

    return (
        <div className={styles.entry} key={title}>
            <p className={styles['entry__title']}>{translateKey(title)}</p>
            <p className={styles['entry__body']}>{body}</p>
        </div>
    );
};
