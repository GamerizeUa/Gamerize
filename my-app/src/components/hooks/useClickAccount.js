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
        const token = localStorage.getItem('token');

        if (token) {
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