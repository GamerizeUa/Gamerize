import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {checkAuth} from "../../redux/authorizationSlice.js";
import {useEffect} from "react";

const useClickAccount = (setIsDisplayedLoginPopUp, optionalCloseFunction) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated} = useSelector((state) => state.authorization);

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch])

    const closeBurger = () => {
        if (optionalCloseFunction && typeof optionalCloseFunction === 'function') {
            optionalCloseFunction();
        }
    }

    const handleClickAccount = (e) => {
        e.preventDefault();
        console.log(isAuthenticated)

        if (isAuthenticated) {
            navigate('/login');
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