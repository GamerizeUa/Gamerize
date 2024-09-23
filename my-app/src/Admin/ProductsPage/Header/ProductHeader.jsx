import { Link } from 'react-router-dom';
import { cn } from '@/utils/classnames';
import sprite from '@/assets/icons/sprite.svg';
import Filter from '@/assets/icons/Filter.svg';
import styles from '../products.module.css';
import buttons from '@/assets/styles/buttons.module.css';

export const ProductHeader = ({
    searchQuery,
    handleSearch,
    handleShowFilters,
}) => {
    return (
        <section className={styles['products__header']}>
            <div className={styles['products__field']}>
                <svg className={styles['products__icon']}>
                    <use
                        href={sprite + '#icon-search'}
                        fill="#FFFFFF"
                        stroke="#2B2B2B"
                    />
                </svg>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Пошук за ID, назвою..."
                    className={styles['products__input']}
                />
            </div>
            <button
                className={cn(buttons.btn, buttons['btn--secondary'])}
                onClick={handleShowFilters}
            >
                <img
                    className={cn(
                        styles['products__icon'],
                        styles['products__icon--sm']
                    )}
                    src={Filter}
                />
                Фільтри
            </button>
            <Link
                to="/admin/products/add"
                className={cn(buttons.btn, buttons['btn--primary'])}
            >
                Додати продукт
                <svg
                    className={cn(
                        styles['products__icon'],
                        styles['products__icon--sm']
                    )}
                >
                    <use href={sprite + '#icon-plus'} fill="#FFFFFF" />
                </svg>
            </Link>
        </section>
    );
};
