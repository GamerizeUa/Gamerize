import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Cookies from "js-cookie";

export const useLogoutClient = () => {
    const navigate = useNavigate();

    const logoutClient = () => {
        Axios.post('https://gamerize.ltd.ua/api/Logout/logout')
            .then(() => {
                navigate('/');
                Cookies.set("auth", "false")
            })
            .catch((error) => {
                console.error("Logout failed: ", error);
            });
    };

    return logoutClient;
};