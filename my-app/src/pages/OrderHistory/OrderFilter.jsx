import { useState } from 'react';
import { ChevronDown, ChevronUp } from '@/assets/icons/Chevron';
import styles from './OrderHistory.module.css';

const FilterOption = ({ id, value, filter, onChange, label }) => (
    <div className={styles.selectorItem}>
        <div className={styles.inputWrapper}>
            <span className={styles.fakeInput} />
            <input
                type="radio"
                id={id}
                name="filter"
                value={value}
                checked={filter === value}
                onChange={onChange}
                className={styles.selectorInput}
            />
        </div>
        <label htmlFor={id} className={styles.selectorLabel}>
            {label}
        </label>
    </div>
);

export const OrderFilter = ({ filter, setFilter }) => {
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);

    const toggleSelector = () => setIsSelectorOpen((prev) => !prev);

    const handleChangeFilter = (event) => {
        setFilter(event.target.value);
        setIsSelectorOpen(false);
    };

    const filterOptions = [
        { id: 'all', value: 'Всі замовлення', label: 'Всі замовлення' },
        { id: 'waiting', value: 'Очікуються', label: 'Очікуються' },
        { id: 'delivered', value: 'Доставлені', label: 'Доставлені' },
        { id: 'sent', value: 'Відправлені', label: 'Відправлені' },
    ];

    return (
        <div>
            <button className={styles.selectingBtn} onClick={toggleSelector}>
                <p className={styles.selectingBtnText}>{filter}</p>
                {isSelectorOpen ? (
                    <ChevronDown className={styles.chevron} />
                ) : (
                    <ChevronUp className={styles.chevron} />
                )}
            </button>
            {isSelectorOpen && (
                <div className={styles.selectorWrapper}>
                    <div className={styles.selectorContent}>
                        {filterOptions.map((option) => (
                            <FilterOption
                                key={option.id}
                                {...option}
                                filter={filter}
                                onChange={handleChangeFilter}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
