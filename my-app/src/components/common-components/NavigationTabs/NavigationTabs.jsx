import React, {useEffect, useRef, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {changeTranslation} from "@/redux/translationTab.js";

import styles from "./NavigationTabs.module.css";

export const NavigationTabs = () => {
    const translationTab = useSelector((state) => state.translationTab.value);
    const dispatch = useDispatch()
    const navLineRef = useRef();
    const navContainerRef = useRef();
    const favoritesRef = useRef();
    const loginRef = useRef();
    const orderHistoryRef = useRef();
    const settingsRef = useRef();
    const location = useLocation();

    const calculateOffsetLeft = (element) => {
        return element.getBoundingClientRect().left - navContainerRef.current.getBoundingClientRect().left;
    }

    useEffect(() => {
        let activeTabRef;
        switch (location.pathname) {
            case '/login':
                activeTabRef = loginRef;
                break;
            case '/order/history':
                activeTabRef = orderHistoryRef;
                break;
            case '/favorites':
                activeTabRef = favoritesRef;
                break;
            case '/settings':
                activeTabRef = settingsRef;
                break;
            default:
                return;
        }
        if (activeTabRef.current && navContainerRef.current) {
            activeTabRef.current.style.color = '#2B2B2B';
            const newTranslation = calculateOffsetLeft(activeTabRef.current);
            const newLineWidth = activeTabRef.current.offsetWidth;
            dispatch(changeTranslation({translation: newTranslation, lineWidth: newLineWidth}));
        }
    }, [])

    return(
        <div className={styles.navigationTabs}>
            <nav className={styles.navigationTabs_tabs} ref={navContainerRef}>
                <ul>
                    <Link to="/login" ref={loginRef}><li>Акаунт</li></Link>
                    <Link to="/order/history" ref={orderHistoryRef}><li>Історія замовлень</li></Link>
                    <Link to="/favorites" ref={favoritesRef}><li>Список бажань</li></Link>
                    <Link to="/settings" ref={settingsRef}><li>Налаштування</li></Link>
                </ul>
                <div className={styles.navigationTabs_navLine}>
                    <div ref={navLineRef} style={{transform: `translateX(${translationTab.translation}px)`,
                        width: `${translationTab.lineWidth}px`}}>
                    </div>
                </div>
            </nav>
        </div>
    )
}