import styles from "./DeleteAccountPopUp.module.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import handleLinkClick from "../../../../utils/ScrollToTop.js";

export const DeleteAccountPopUp = ({setIsDisplayedDeleteAccount, userId}) => {
    const navigate = useNavigate();

    const closePopUp = () => {
        setIsDisplayedDeleteAccount(false);
    }

    const closePopupByClicking = (event) => {
        if (event.currentTarget === event.target) {
            closePopUp();
        }
    }

    const deleteAccount = (e) => {
        axios.delete(`https://gamerize.ltd.ua/api/Account/Delete/${userId}`)
            .then(() => {
                closePopUp();
                Cookies.set('auth', "false");
                handleLinkClick(e);
                navigate('/');
            })
    }

    return (
        <div className={styles.deleteAccount_background} onClick={closePopupByClicking}>
            <div className={styles.deleteAccount}>
                <div className={styles.deleteAccount_cross} onClick={closePopUp}></div>
                <p className={styles.deleteAccount_text}>Ви впевнені, що хочете видалити акаунт?</p>
                <div className={styles.deleteAccount_buttons}>
                    <button onClick={deleteAccount}>Так</button>
                    <button onClick={closePopUp}>Ні</button>
                </div>
            </div>
        </div>
    )
}