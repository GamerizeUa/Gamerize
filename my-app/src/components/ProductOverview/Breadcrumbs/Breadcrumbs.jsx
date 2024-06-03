import styles from './Breadcrumbs.module.css';
import { Link } from 'react-router-dom';
import ArrowIcon from '../icons/ArrowIcon.jsx';

export const Breadcrumbs = ({ page }) => {
    if (!page) return null;

    const pageNames = ['Головна сторінка', ...page.name];
    const links = ['/', ...page.link];

    return (
        <section className={styles.breadcrumbs}>
            {pageNames.map((breadcrumb, index) => (
                <div className={styles['breadcrumbs__container']} key={index}>
                    {index !== 0 && <ArrowIcon />}
                    <Link
                        to={links[index]}
                        className={styles['breadcrumbs__item']}
                    >
                        {breadcrumb}
                    </Link>
                </div>
            ))}
        </section>
    );
};
