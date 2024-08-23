import { Link } from 'react-router-dom';
import styles from './Logo.module.css';
import handleLinkClick from '../../utils/ScrollToTop';

export const Logo = () => {
    return (
        <div onClick={handleLinkClick}>
            <Link to="/">
                <h1 className={styles.logo}>Gamerise</h1>
            </Link>
        </div>
    );
};
