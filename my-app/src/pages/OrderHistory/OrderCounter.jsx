import styles from './OrderHistory.module.css';

export const OrderCounter = ({ ordersCount = 0 }) => {
    const title =
        ordersCount % 10 >= 1 && ordersCount % 10 <= 4
            ? 'замовлення'
            : 'замовлень';

    return <p className={styles.ordersAmount}>{`${ordersCount} ${title}`}</p>;
};
