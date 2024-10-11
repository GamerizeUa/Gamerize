import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { OrderCounter } from './OrderCounter';
import { OrderList } from './OrderList';
import { OrderFilter } from './OrderFilter';
import { selectOrdersByUserAndStatus } from '@/redux/selectors.js';
import { Message } from '@/components/Message/Message.jsx';
import { fetchOrdersByUserId } from '@/redux/orderHistorySlice.js';
import { getAccountInformation } from '@/utils/account';
import styles from './OrderHistory.module.css';

const OrderHistoryContainer = ({ filter, setFilter, children }) => {
    return (
        <div className={`${styles.pageWrapper} container`}>
            <h1 className={styles.title}>Історія замовлень</h1>
            <div className={styles.orderWrapper}>
                <OrderFilter filter={filter} setFilter={setFilter} />

                {children}
            </div>
        </div>
    );
};

const getStatusByFilterValue = (filterValue) => {
    let statusValue;

    switch (filterValue) {
        case 'Всі замовлення':
            statusValue = 'Усі';
            break;
        case 'Отримані':
            statusValue = 'Відправлено';
            break;
        case 'Відмінені':
            statusValue = 'Відмінено';
            break;
        default:
            break;
    }

    return statusValue;
};

const getMessageForEmptyOrders = (filterValue) => {
    switch (filterValue) {
        case 'Отримані':
            return {
                title: 'Немає завершених замовлень',
                subtitle: 'Ви ще не завершили жодного замовлення.',
            };
        case 'Відмінені':
            return {
                title: 'Немає скасованих замовлень',
                subtitle: 'Ви не скасували жодного замовлення.',
            };
        default:
            return {
                title: 'Немає замовлень',
                subtitle: 'Ви ще не зробили жодного замовлення.',
            };
    }
};

const OrderHistory = () => {
    const [filter, setFilter] = useState('Всі замовлення');
    const [userId, setUserId] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { orders, isLoading, error } = useSelector((state) =>
        selectOrdersByUserAndStatus(state, getStatusByFilterValue(filter))
    );

    useEffect(() => {
        getAccountInformation().then((user) => setUserId(user.id));
    }, []);

    useEffect(() => {
        dispatch(fetchOrdersByUserId(userId));
    }, [userId, dispatch]);

    if (isLoading)
        return (
            <OrderHistoryContainer filter={filter} setFilter={setFilter}>
                <Message
                    title={'Завантаження...'}
                    subtitle={
                        'Будь ласка, зачекайте, поки ми завантажуємо ваш контент.'
                    }
                    btnText={'Спробувати ще раз'}
                    handleClick={() => dispatch(fetchOrdersByUserId(userId))}
                />
            </OrderHistoryContainer>
        );
    else if (orders.length === 0)
        return (
            <OrderHistoryContainer filter={filter} setFilter={setFilter}>
                <Message {...getMessageForEmptyOrders(filter)} />
            </OrderHistoryContainer>
        );
    else if (error)
        return (
            <OrderHistoryContainer filter={filter} setFilter={setFilter}>
                <Message
                    title={'Щось пішло не так'}
                    subtitle={error ? error : 'Не вдалося завантажити контент.'}
                    btnText={'На головну сторінку'}
                    handleClick={() => navigate('/')}
                />
            </OrderHistoryContainer>
        );

    return (
        <OrderHistoryContainer filter={filter} setFilter={setFilter}>
            <OrderCounter ordersCount={orders.length} />
            <OrderList orders={orders} />
        </OrderHistoryContainer>
    );
};

export default OrderHistory;
