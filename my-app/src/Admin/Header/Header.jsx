import styles from "./Header.module.css";
import {useLocation} from "react-router-dom";

export const Header = () => {
    const location = useLocation();

    const setPageTitle = () => {
        switch(location.pathname) {
            case('/admin'):
                return 'Привіт'
            case '/admin/products':
                return 'Продукти'
            case '/admin/questions':
                return 'Запитання'
            case '/admin/edit':
                return 'Редагування'
            default:
                return 'Привіт'
        }
    }

    return(
        <header className={styles.header}>
                <div className={styles.header_leftPart}>
                    <p className={styles.header_logo}>Gamerise</p>
                    <p className={styles.header_pageTitle}>{setPageTitle()}</p>
                </div>
                <div className={styles.header_rightPart}>
                    <div className={styles.header_photo}></div>
                    <p className={styles.header_name}>BdfdfB BdfdfdfdfdfdfB</p>
                </div>
        </header>
    )
}