import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import {logout} from "../../redux/authorizationSlice.js";

export const useLogoutClient = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutClient = () => {
        Axios.post('https://gamerize.ltd.ua/api/Logout/logout')
            .then(() => {
                dispatch(logout());
                navigate('/');
            })
            .catch((error) => {
                console.error("Logout failed: ", error);
            });
    };

    return logoutClient;
};