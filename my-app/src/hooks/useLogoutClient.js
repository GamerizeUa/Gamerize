import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logoutWishList } from '@/redux/wishListSlice.js';

export const useLogoutClient = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutClient = () => {
        Axios.post('https://gamerize.ltd.ua/api/Logout/logout')
            .then(() => {
                dispatch(logoutWishList());
                navigate('/');
                Cookies.set('auth', 'false');
            })
            .catch((error) => {
                console.error('Logout failed: ', error);
            });
    };

    return logoutClient;
};
