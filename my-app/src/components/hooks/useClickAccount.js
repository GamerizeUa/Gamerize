import { useNavigate } from 'react-router-dom';

const useClickAccount = (setIsDisplayedLoginPopUp, optionalCloseFunction) => {
    const navigate = useNavigate();

    const handleClickAccount = (e) => {
        e.preventDefault();
        const userIdState = localStorage.getItem('userID');

        if (userIdState) {
            navigate('/login');
            if (optionalCloseFunction && typeof optionalCloseFunction === 'function') {
                optionalCloseFunction();
            }
        } else {
            setIsDisplayedLoginPopUp(true);
        }
    };

    return handleClickAccount;
};

export default useClickAccount;