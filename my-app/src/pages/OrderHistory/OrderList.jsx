import styles from './OrderHistory.module.css';
import OrderItem from '@/pages/OrderHistory/OrderItem/OrderItem.jsx';

export const OrderList = ({ orders }) => {
    return (
        <>
            <ul className={styles.orderList}>
                {orders.map((order) => (
                    <OrderItem key={order.id} {...order} />
                ))}
            </ul>
        </>
    );
};
