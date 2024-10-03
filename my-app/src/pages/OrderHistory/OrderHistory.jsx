import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { OrderCounter } from './OrderCounter';
import { OrderList } from './OrderList';
import { OrderFilter } from './OrderFilter';
import { selectOrdersByUser } from '@/redux/selectors.js';
import { Message } from '@/components/Message/Message.jsx';
import { fetchOrdersByUserId } from '@/redux/orderHistorySlice.js';
import { getAccountInformation } from '@/utils/account';
import styles from './OrderHistory.module.css';

const OrderHistoryContainer = ({ children }) => {
    return (
        <div className={`${styles.pageWrapper} container`}>
            <h1 className={styles.title}>Історія замовлень</h1>
            {children}
        </div>
    );
};

const OrderHistory = () => {
    const [filter, setFilter] = useState('Всі замовлення');
    const [userId, setUserId] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { orders, isLoading, error } = useSelector((state) =>
        selectOrdersByUser(state, userId)
    );

    const visibleOrders =
        filter === 'Всі замовлення'
            ? orders
            : orders.filter((order) => order.status === filter);

    useEffect(() => {
        getAccountInformation().then((user) => setUserId(user.id));
    }, []);

    useEffect(() => {
        dispatch(fetchOrdersByUserId(userId));
    }, [userId, dispatch]);

    if (isLoading)
        return (
            <OrderHistoryContainer>
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
    else if (error)
        return (
            <OrderHistoryContainer>
                <Message
                    title={'Щось пішло не так'}
                    subtitle={error ? error : 'Не вдалося завантажити контент.'}
                    btnText={'На головну сторінку'}
                    handleClick={() => navigate('/')}
                />
            </OrderHistoryContainer>
        );

    return (
        <OrderHistoryContainer>
            <div className={styles.orderWrapper}>
                <OrderFilter filter={filter} setFilter={setFilter} />
                <OrderCounter ordersCount={visibleOrders.length} />
                <OrderList orders={visibleOrders} />
            </div>
        </OrderHistoryContainer>
    );
};

export default OrderHistory;
