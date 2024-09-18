import styles from './NavBar.module.css';
import sprite from "../../assets/icons/sprite.svg";
import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

export const NavBar = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('/admin');
    const tabs = {
        orders: {
            title: "Замовлення",
            link: '/admin',
            engTitle: 'orders'
        },
        products: {
            title: "Продукти",
            link: '/admin/products',
            engTitle: 'products'
        },
        questions: {
            title: "Запитання",
            link: '/admin/questions',
            engTitle: 'questions'
        }
    }

    useEffect(() => {
        if (location.pathname.startsWith('/admin/questions')) {
            setActiveTab('/admin/questions');
        } else if (location.pathname.startsWith('/admin/products')) {
            setActiveTab('/admin/products');
        } else if (location.pathname === '/admin') {
            setActiveTab('/admin');
        }
    }, []);

    const handleTabClick = (path) => {
        setActiveTab(path);
    };

    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbar_list}>
                {
                    Object.values(tabs).map((tab, index) => (
                        <Link to={tab.link}
                              onClick={() => handleTabClick(tab.link)}
                              key={index}
                        >
                            <li className={`${styles.navbar_item} ${activeTab === tab.link ? styles.active : ''}`}
                            >
                                <svg width="24" height="24">
                                    <use
                                        href={sprite + `#icon-admin-${tab.engTitle}-${activeTab === tab.link ? 'white' : 'purple'}`}
                                        fill="none">

                                    </use>
                                </svg>
                                <p className={styles.navbar_itemTitle}>{tab.title}</p>
                            </li>
                        </Link>
                    ))
                }
            </ul>
        </nav>
    )
}