import styles from './Dropdown.module.css';
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon';
import { useState } from 'react';

const Dropdown = ({ children, title }) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <article className={styles.dropdown}>
            <header className={styles['dropdown__header']}>
                <p
                    className={styles['dropdown__title']}
                    onClick={toggleVisibility}
                >
                    {title}
                </p>
                <button
                    type="button"
                    className={styles['dropdown__btn']}
                    onClick={toggleVisibility}
                    aria-expanded={isVisible}
                >
                    <ArrowDownIcon />
                </button>
            </header>
            <div className={styles['dropdown__item']}>{children}</div>
        </article>
    );
};

export default Dropdown;
