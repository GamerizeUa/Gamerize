import { useState } from 'react';
import { OrderCounter } from './OrderCounter';
import { OrderList } from './OrderList';
import { OrderFilter } from './OrderFilter';
import styles from './OrderHistory.module.css';

const OrderHistory = ({ orders }) => {
    const [filter, setFilter] = useState('Всі замовлення');

    const visibleOrders =
        filter === 'Всі замовлення'
            ? orders
            : orders.filter((order) => order.status === filter);

    return (
        <div className={`${styles.pageWrapper} container`}>
            <h1 className={styles.title}>Історія замовлень</h1>
            <div className={styles.orderWrapper}>
                <OrderFilter filter={filter} setFilter={setFilter} />
                <OrderCounter ordersCount={visibleOrders.length} />
                <OrderList orders={visibleOrders} />
            </div>
        </div>
    );
};

export default OrderHistory;
