import styles from './GamePickerBtn.module.css';
import sprite from '../../../assets/icons/sprite.svg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../Product';

export default function GamePickerBtn() {
    const { gamePickerFilters } = useContext(ProductContext);

    if (!gamePickerFilters) return null;

    return (
        <Link
            to={{ pathname: '/catalog', state: gamePickerFilters }}
            className={styles.btn}
        >
            <span className={styles['btn__title']}>Переглянути всі товари</span>
            <svg className={styles['btn__icon']}>
                <use href={sprite + '#icon-arrow-right'}></use>
            </svg>
        </Link>
    );
}
