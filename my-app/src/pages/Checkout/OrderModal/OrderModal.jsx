import sprite from '@/assets/icons/sprite.svg';
import styles from './OrderModal.module.css';
import {assignIsDisplayedSuccessfulOrderPopUp} from "@/redux/formsDisplaying.js";
import {useDispatch} from "react-redux";

export const OrderModal = () => {
    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(assignIsDisplayedSuccessfulOrderPopUp(false))
    }

    const handleBackdropClick = (event) => {
        if (event.currentTarget === event.target) {
            closeModal();
        }
    }

    return (
        <div className={styles.backdrop} onClick={handleBackdropClick}>
            <div className={styles.orderModalContent}>
                <svg className={styles.orderModalBtn} onClick={closeModal}>
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
