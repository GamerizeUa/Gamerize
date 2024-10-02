import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersByUserId } from '@/redux/orderHistorySlice.js';
import { PersonalOffice } from '@/components/PersonalOfficeTabs/PersonalOffice.jsx';
import { selectOrdersByUser } from '@/redux/selectors.js';
import { Message } from '@/components/Message/Message.jsx';
import OrderHistory from './OrderHistory.jsx';
import { useNavigate } from 'react-router-dom';

export default function OrderHistoryPage() {
    const [userId, setUserId] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { orders, isLoading, error } = useSelector((state) =>
        selectOrdersByUser(state, userId)
    );

    useEffect(() => {
        const getAccountInformation = async () => {
            const res = await axios.get(
                'https://gamerize.ltd.ua/api/Account/profile',
                {
                    withCredentials: true,
                }
            );

            setUserId(res.data.id);
        };

        getAccountInformation();
    }, []);

    useEffect(() => {
        dispatch(fetchOrdersByUserId(userId));
    }, [userId, dispatch]);

    if (isLoading)
        return (
            <Message
                title={'Loading...'}
                subtitle={'Please wait while we load your content.'}
                btnText={'Try again'}
                handleClick={() => dispatch(fetchOrdersByUserId(userId))}
            />
        );
    else if (orders.length === 0 || error)
        return (
            <Message
                title={'Something went wrong'}
                subtitle={
                    error ? error : 'Unable to load content. Please try again.'
                }
                btnText={'Back home'}
                handleClick={() => navigate('/')}
            />
        );

    return (
        <div>
            <PersonalOffice />
            <OrderHistory orders={orders} userId={userId} />
        </div>
    );
}
