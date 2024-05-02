import { useNavigate } from 'react-router-dom';

const useClickAccount = (setIsDisplayedLoginPopUp, optionalCloseFunction) => {
    const navigate = useNavigate();

    const closeBurger = () => {
        if (optionalCloseFunction && typeof optionalCloseFunction === 'function') {
            optionalCloseFunction();
        }
    }

    const handleClickAccount = (e) => {
        e.preventDefault();
        const userIdState = localStorage.getItem('userID');

        if (userIdState) {
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