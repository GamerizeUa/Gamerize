import { useNavigate } from 'react-router-dom';
import useCheckAuth from "./useCheckAuth.js";
import {useDispatch} from "react-redux";
import {assignIsDisplayedLoginPopUp} from "../../redux/formsDisplaying.js";

const useClickAccount = (optionalCloseFunction) => {
    const navigate = useNavigate();
    const {checkAuthentication} = useCheckAuth();
    const dispatch = useDispatch();

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
            dispatch(assignIsDisplayedLoginPopUp(false));
            closeBurger();
        } else {
            dispatch(assignIsDisplayedLoginPopUp(true));
            closeBurger();
        }
    };

    return handleClickAccount;
};

export default useClickAccount;