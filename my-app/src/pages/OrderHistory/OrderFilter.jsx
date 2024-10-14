import {useEffect, useState} from 'react';
import { ChevronDown, ChevronUp } from '@/assets/icons/Chevron';
import styles from './OrderHistory.module.css';
import {useDispatch, useSelector} from "react-redux";
import {fetchStatuses} from "@/redux/statusesOrderSlice.js";
import {changePage} from "@/redux/orderHistorySlice.js";

const FilterOption = ({ id, status, onChange, filter }) => (
    <div className={styles.selectorItem}>
        <div className={styles.inputWrapper}>
            <span className={styles.fakeInput} />
            <input
                type="radio"
                id={id}
                name="filter"
                value={status}
                checked={filter.status === status}
                onChange={onChange}
                className={styles.selectorInput}
            />
        </div>
        <label htmlFor={id} className={styles.selectorLabel}>
            {status}
        </label>
    </div>
);

export const OrderFilter = ({ filter, setFilter }) => {
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const dispatch = useDispatch();
    const {statusesOrder} = useSelector((state) => state.statusesOrder);

    useEffect(() => {
        dispatch(fetchStatuses())
    }, []);

    const toggleSelector = () => setIsSelectorOpen((prev) => !prev);

    const handleChangeFilter = (id, status) => {
        dispatch(changePage(1));
        setFilter({id, status});
        setIsSelectorOpen(false);
    };

    return (
        <div>
            <button className={styles.selectingBtn} onClick={toggleSelector}>
                <p className={styles.selectingBtnText}>{filter.status}</p>
                {isSelectorOpen ? (
                    <ChevronDown className={styles.chevron} />
                ) : (
                    <ChevronUp className={styles.chevron} />
                )}
            </button>
            {isSelectorOpen && (
                <div className={styles.selectorWrapper}>
                    <div className={styles.selectorContent}>
                        {statusesOrder.map((option) => (
                            <FilterOption
                                key={option.id}
                                {...option}
                                filter={filter}
                                onChange={() => handleChangeFilter(option.id, option.status)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
