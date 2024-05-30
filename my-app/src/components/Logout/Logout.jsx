import sprite from "../../assets/icons/sprite.svg";
import styles from "../Header/AccountInformation/AccountInformation.module.css";
import useClickAccount from "../hooks/useClickAccount.js";
import {logout} from "../../redux/authorizationSlice.js";
import Axios from "axios";
import useCheckAuth from "../hooks/useCheckAuth.js";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

export const logoutClient = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    Axios.post('https://gamerize.ltd.ua/api/Logout/logout')
        .then(() => {
            dispatch(logout());
            navigate('/');
        })
}

export const Logout = ({setIsDisplayedLoginPopUp}) => {
    const handleClickAccount = useClickAccount(setIsDisplayedLoginPopUp);
    const isAuthenticated = useCheckAuth();

    return(
        <>
            {isAuthenticated ? <>
                <svg width="24" height="24">
                    <use href={sprite + "#icon-log-out"}></use>
                </svg>
                <p className={styles.accountLinkText} onClick={logoutClient}>
                    Вихід
                </p>
            </> : <>
                <svg width="24" height="24">
                    <use href={sprite + "#icon-log-in"}></use>
                </svg>
                <p className={styles.accountLinkText} onClick={handleClickAccount}>
                    Вхід
                </p>
            </>}
        </>

    )
}