import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { OrderCounter } from './OrderCounter';
import { OrderList } from './OrderList';
import { OrderFilter } from './OrderFilter';
import { selectOrdersByUserAndStatus } from '@/redux/selectors.js';
import { Message } from '@/components/Message/Message.jsx';
import { changePage, fetchOrdersByUserId } from '@/redux/orderHistorySlice.js';
import { getAccountInformation } from '@/utils/account';
import styles from './OrderHistory.module.css';
import { Pagination } from '@/Admin/Pagination/Pagination';

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
        case 'Очікуються':
            statusValue = 'Очікується';
            break;
        case 'Доставлені':
            statusValue = 'Доставлено';
            break;
        case 'Відправлені':
            statusValue = 'Відправлено';
            break;
        default:
            break;
    }

    return statusValue;
};

const getMessageForEmptyOrders = (filterValue) => {
    switch (filterValue) {
        case 'Доставлені':
            return {
                title: 'Немає доставлених замовлень',
                subtitle: 'Ми ще не доставили вам жодного замовлення.',
            };
        case 'Відправлені':
            return {
                title: 'Немає відправлених замовлень',
                subtitle: 'Ми ще не відправили вам жодного замовлення.',
            };
        case 'Очікуються':
            return {
                title: 'Немає очікуваних замовлень',
                subtitle: 'Жодне замовлення ще не очікується на відправку.',
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

    const ordersPerPage = 3;

    const { orders, totalPages, page, totalOrders, isLoading, error } =
        useSelector((state) =>
            selectOrdersByUserAndStatus(state, getStatusByFilterValue(filter))
        );

    useEffect(() => {
        getAccountInformation().then((user) => setUserId(user.id));
    }, []);

    useEffect(() => {
        dispatch(
            fetchOrdersByUserId({
                id: userId,
                page,
                totalOrder: ordersPerPage,
            })
        );
    }, [userId, dispatch, page]);

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
            <OrderCounter ordersCount={totalOrders} />
            <OrderList orders={orders} />
            <Pagination
                totalItems={ordersPerPage * totalPages}
                totalPages={totalPages}
                currentPage={page}
                setCurrentPage={(newPage) => dispatch(changePage(newPage))}
                itemsOnPage={ordersPerPage}
            />
        </OrderHistoryContainer>
    );
};

export default OrderHistory;
