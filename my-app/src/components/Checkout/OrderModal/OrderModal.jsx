import sprite from '@/assets/icons/sprite.svg';
import styles from './OrderModal.module.css';

export const OrderModal = () => {
    return (
        <div className={styles.backdrop}>
            <div className={styles.orderModalContent}>
                <svg className={styles.orderModalBtn}>
                    <use href={sprite + '#icon-cross'} stroke="currentColor" />
                </svg>
                <p className={styles.orderModalHeader}>
                    Дякуємо за замовлення!
                </p>
                <p className={styles.orderModalText}>
                    Очікуйте на повідомлення від менеджера для підтвердження!
                </p>
            </div>
        </div>
    );
};
