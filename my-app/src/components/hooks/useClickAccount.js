import { useNavigate } from 'react-router-dom';
import useCheckAuth from "./useCheckAuth.js";

const useClickAccount = (setIsDisplayedLoginPopUp, optionalCloseFunction) => {
    const navigate = useNavigate();
    const {checkAuthentication} = useCheckAuth();

    const closeBurger = () => {
        if (optionalCloseFunction && typeof optionalCloseFunction === 'function') {
            optionalCloseFunction();
        }
    }

    const handleClickAccount = (e) => {
        e.preventDefault();
        const isAuthenticated = checkAuthentication();
        if (isAuthenticated) {
            navigate('/personal-account');
            setIsDisplayedLoginPopUp(false);
            closeBurger();
        } else {
            setIsDisplayedLoginPopUp(true);
            closeBurger();
        }
    };

    return handleClickAccount;
};

export default useClickAccount;