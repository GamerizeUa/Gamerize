import sprite from "../../assets/icons/sprite.svg";
import styles from "../Header/AccountInformation/AccountInformation.module.css";
import useClickAccount from "../hooks/useClickAccount.js";
import useCheckAuth from "../hooks/useCheckAuth.js";
import {useLogoutClient} from "../hooks/useLogoutClient.js";

export const Logout = () => {
    const handleClickAccount = useClickAccount();
    const {checkAuthentication} = useCheckAuth();
    const logoutClient = useLogoutClient();
    const isAuthenticated = checkAuthentication();

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