import React from "react";
import styles from './Breadcrumbs.module.css'
import {Link} from "react-router-dom";
import ArrowIcon from './icons/ArrowIcon.jsx';

export const Breadcrumbs = () => {
    const array = ['Головна сторінка', 'Жанри', 'Карткові', 'Кодові імена: гра слів'];

    return(
        <div className={styles.breadcrumbs}>
            {array.map((breadcrumb, index) => (
                <div className={styles.breadcrumbs_container} key={index} >
                    <Link to='/' className={styles.breadcrumbs_crumb}>{breadcrumb}</Link>
                    {index < array.length - 1 && <ArrowIcon />}
                </div>
            ))}
        </div>
    )
}