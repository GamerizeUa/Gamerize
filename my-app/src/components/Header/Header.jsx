import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import AccountInformation from './AccountInformation/AccountInformation.jsx';
import { SearchInput } from '@/components/Header/SearchInput/SearchInput';
import { Logo } from '../Logo/Logo';
import { Link } from 'react-router-dom';
import useClickAccount from '@/hooks/useClickAccount.js';
import sprite from '@/assets/icons/sprite.svg';
import {useDispatch, useSelector} from 'react-redux';
import { selectCartProductsCount } from '@/redux/selectors.js';
import useCheckAuth from '@/hooks/useCheckAuth.js';
import {assignIsDisplayedBurgerMenu, assignIsDisplayedCart} from "@/redux/formsDisplaying.js";
import useWindowWidth from "@/hooks/useWindowWidth.js";

const Header = () => {
    const [accountInformation, setAccountInformation] = useState(false);
    const handleClickAccount = useClickAccount();
    const cartProductsCount = useSelector(selectCartProductsCount);
    const { checkAuthentication } = useCheckAuth();
    const isAuthenticated = checkAuthentication();
    const dispatch = useDispatch();
    const windowWidth = useWindowWidth();

    return (
        <section className={styles.headerSection}>
            <div className={styles.header}>
                <div className={styles.logoWrapper}>
                    {windowWidth < 1280 && (
                        <div
                            className={styles.burgerMenu}
                            onClick={() => {
                                dispatch(assignIsDisplayedBurgerMenu(true))
                            }}
                        >
                            <svg width={24} height={24}>
                                <use href={sprite + '#icon-burger_menu'} />
                            </svg>
                        </div>
                    )}
                    {windowWidth >= 744 && <Logo />}
                </div>
                {windowWidth < 744 && <Logo />}
                <div className={styles.headerInfoBloc}>
                    {windowWidth >= 1280 && <SearchInput />}
                    <ul className={styles.headerList}>
                        {windowWidth >= 744 && (
                            <li>
                                <a
                                    href="tel:+380987067447"
                                    rel="noopener noreferrer"
                                    className={styles.telLink}
                                >
                                    <svg width={32} height={32}>
                                        <use
                                            href={sprite + '#icon-phone'}
                                            stroke="currentColor"
                                            fill="#AAC4FF"
                                        />
                                    </svg>
                                    <p>+380 98 7067 447</p>
                                </a>
                            </li>
                        )}
                        <li
                            onClick={() => {
                                dispatch(assignIsDisplayedCart(true))
                            }}
                        >
                            <button
                                className={
                                    styles.headerButton +
                                    ' ' +
                                    styles.cartButton
                                }
                            >
                                <svg className={styles.cartIcon}>
                                    <use href={sprite + '#icon-cart'} />
                                </svg>
                                {cartProductsCount > 0 && (
                                    <div className={styles.cartCounter}>
                                        <span
                                            className={styles.cartCounterValue}
                                        >
                                            {cartProductsCount}
                                        </span>
                                    </div>
                                )}
                            </button>
                        </li>
                        {windowWidth >= 744 && (
                            <li
                                className={styles.headerListItem}
                                onMouseEnter={() => {
                                    setTimeout(() => {
                                        setAccountInformation(true);
                                    }, 300);
                                }}
                                onMouseLeave={() => {
                                    setTimeout(() => {
                                        setAccountInformation(false);
                                    }, 300);
                                }}
                            >
                                <Link
                                    to="/personal-account"
                                    className={styles.headerButton}
                                    onClick={handleClickAccount}
                                >
                                    <svg width={32} height={32}>
                                        <use
                                            href={sprite + '#icon-user'}
                                            fill="#AAC4FF"
                                            stroke="#EEF1FF"
                                        />
                                    </svg>
                                </Link>
                                {accountInformation && isAuthenticated && (
                                    <AccountInformation />
                                )}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Header;
