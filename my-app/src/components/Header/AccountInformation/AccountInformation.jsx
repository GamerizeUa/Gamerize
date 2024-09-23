import { Link } from 'react-router-dom';
import styles from './AccountInformation.module.css';
import sprite from '@/assets/icons/sprite.svg';
import HeartIcon from '../../icons/HeartIcon';
import { Logout } from '../../Logout/Logout.jsx';
import { useEffect, useState } from 'react';
import useCheckAuth from '@/hooks/useCheckAuth.js';
import useCheckAdmin from '@/hooks/useCheckAdmin.js';

const AccountInformation = () => {
    const { checkAuthentication } = useCheckAuth();
    const isAuthenticated = checkAuthentication();
    const { isAdmin } = useCheckAdmin();
    const [isUserAdmin, setIsUserAdmin] = useState(false);

    useEffect(() => {
        if (isAdmin) {
            setIsUserAdmin(true);
        }
    }, [isAdmin]);

    useEffect(() => {
        if (!isAuthenticated) {
            setIsUserAdmin(false);
        }
    }, [isAuthenticated]);

    return (
        <div className={styles.accountLinksWrapper}>
            <ul className={styles.accountList}>
                <li className={styles.accountListItem}>
                    <Link to="/personal-account" className={styles.accountLink}>
                        <div>
                            <svg width="24" height="24">
                                <use href={sprite + '#icon-settings'}></use>
                            </svg>
                        </div>
                        <p className={styles.accountLinkText}>Особисті дані</p>
                    </Link>
                </li>
                <li className={styles.accountListItem}>
                    <Link to="/order/history" className={styles.accountLink}>
                        <div>
                            <svg width="24" height="24">
                                <use href={sprite + '#icon-shopping-bag'}></use>
                            </svg>
                        </div>
                        <p className={styles.accountLinkText}>
                            Історія замовлень
                        </p>
                    </Link>
                </li>
                <li className={styles.accountListItem}>
                    <Link to="/wish-list" className={styles.accountLink}>
                        <div>
                            <HeartIcon strokeColor="#AAC4FF" />
                        </div>
                        <p className={styles.accountLinkText}>Список бажань</p>
                    </Link>
                </li>
                {isUserAdmin && (
                    <li className={styles.accountListItem}>
                        <Link to="/admin" className={styles.accountLink}>
                            <div>
                                <svg width="20" height="20">
                                    <use
                                        href={sprite + '#icon-admin-panel'}
                                        fill="none"
                                    ></use>
                                </svg>
                            </div>
                            <p className={styles.accountLinkText}>
                                Адмін панель
                            </p>
                        </Link>
                    </li>
                )}
            </ul>
            <div className={styles.accountlogOut}>
                <Link className={styles.logOutLink}>
                    <Logout />
                </Link>
            </div>
        </div>
    );
};

export default AccountInformation;
