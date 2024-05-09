import sprite from "../../assets/icons/sprite.svg";
import styles from "../Header/AccountInformation/AccountInformation.module.css";
import useClickAccount from "../hooks/useClickAccount.js";
import Axios from "axios";

export const Logout = ({setIsDisplayedLoginPopUp}) => {
    const userIdState = localStorage.getItem('userID');
    const handleLogIn = useClickAccount(setIsDisplayedLoginPopUp);

    const handleLogout = () => {
        Axios.post('https://gamerize.ltd.ua/api/Logout/logout')
            .then(() => localStorage.removeItem('userID'))
            .catch((err) => console.log(err))
    }

    return(
        <>
            {userIdState ? <>
                <svg width="24" height="24">
                    <use href={sprite + "#icon-log-out"}></use>
                </svg>
                <p className={styles.accountLinkText} onClick={handleLogout}>
                    Вихід
                </p>
            </> : <>
                <svg width="24" height="24">
                    <use href={sprite + "#icon-log-in"}></use>
                </svg>
                <p className={styles.accountLinkText} onClick={handleLogIn}>
                    Вхід
                </p>
            </>}
        </>

    )
}