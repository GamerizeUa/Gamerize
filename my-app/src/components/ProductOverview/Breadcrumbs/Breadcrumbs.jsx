import React from "react";
import styles from './Breadcrumbs.module.css'
import {Link} from "react-router-dom";
import ArrowIcon from '../icons/ArrowIcon.jsx';

export const Breadcrumbs = ({page}) => {
    const array = ['Головна сторінка', ...page?.name];
    const links = ['/', ...page?.link]

    return(
        <div className={styles.breadcrumbs}>
            {array.map((breadcrumb, index) => (
                <div className={styles.breadcrumbs_container} key={index} >
                    {index !== 0 && <ArrowIcon />}
                    <Link to={links[index]} className={styles.breadcrumbs_crumb}>{breadcrumb}</Link>
                </div>
            ))}
        </div>
    )
}