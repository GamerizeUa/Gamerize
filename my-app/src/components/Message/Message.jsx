import styles from './Message.module.css';

export const Message = ({ title, subtitle, btnText, handleClick }) => {
    return (
        <div className={styles.message}>
            <h1 className={styles['message__title']}>{title}</h1>
            <p className={styles['message__subtitle']}>{subtitle}</p>
            {handleClick && (
                <button
                    className={styles['message__btn']}
                    onClick={handleClick}
                >
                    {btnText}
                </button>
            )}
        </div>
    );
};
