import styles from './SearchAndFilterPanel.module.css';
import sprite from "@/assets/icons/sprite.svg";
import 'react-calendar/dist/Calendar.css';
import React, {useEffect} from "react";
import {SearchInput} from "@/Admin/OrdersPage/SearchAndFilterPanel/SearchInput.jsx";
import {fetchOrdersByFilter, setDates} from "@/redux/ordersSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {FilterDate} from "@/Admin/OrdersPage/SearchAndFilterPanel/FilterDate.jsx";

export const SearchAndFilterPanel = ({setIsTermSearched}) => {
    const {startDate, endDate} = useSelector(state => state.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        if(startDate || endDate){
            dispatch(fetchOrdersByFilter());
        }
    }, [startDate, endDate]);

    return (
        <div className={styles.panel}>
            <div className={styles.panel_input}>
                <svg width="16" height="16">
                    <use href={sprite + '#icon-admin-search'} fill="none"></use>
                </svg>
                <SearchInput setIsTermSearched={setIsTermSearched}/>
            </div>
            <FilterDate />
        </div>
    )
}