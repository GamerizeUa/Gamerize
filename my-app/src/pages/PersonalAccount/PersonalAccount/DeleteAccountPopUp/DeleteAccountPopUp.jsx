import styles from "./DeleteAccountPopUp.module.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import handleLinkClick from "../../../../utils/ScrollToTop.js";
import {assignIsDisplayedDeleteAccountPopUp, assignIsDisplayedLoginPopUp} from "../../../../redux/formsDisplaying.js";
import {useDispatch, useSelector} from "react-redux";

export const DeleteAccountPopUp = () => {
    const {profile} = useSelector(state => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const closePopUp = () => {
        dispatch(assignIsDisplayedDeleteAccountPopUp(false));
    }

    const closePopupByClicking = (event) => {
        if (event.currentTarget === event.target) {
            closePopUp();
        }
    }

    const deleteAccount = (e) => {
        axios.delete(`https://gamerize.ltd.ua/api/Account/Delete/${profile.id}`)
            .then(() => {
                closePopUp();
                Cookies.set('auth', "false");
                handleLinkClick(e);
                dispatch(assignIsDisplayedLoginPopUp(true));
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