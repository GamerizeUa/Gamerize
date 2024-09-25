import styles from './SearchAndFilterPanel.module.css';
import sprite from "@/assets/icons/sprite.svg";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar'
import React, {useEffect, useRef, useState} from "react";
import {useClickOutside} from "@/hooks/useClickOutside.js";

export const SearchAndFilterPanel = () => {
    const [isDisplayedCalendar, setIsDisplayedCalendar] = useState(false);
    const [calendarValues, setCalendarValues] = useState([new Date(), new Date()]);
    const [chosenDates, setChosenDates] = useState([]);
    const calendarRef = useRef(null);

    useEffect(() => {
        if (calendarValues.length === 2) {
            const formattedDates = calendarValues.map(date => {
                const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
                const isoDate = localDate.toISOString().split('T')[0];
                const [year, month, day] = isoDate.split('-');
                return `${day}-${month}-${year}`;
            });

            setChosenDates(formattedDates);
        }
    }, [calendarValues]);

    const displayCalendar = () => {
        setIsDisplayedCalendar(true);
    }

    const callbackOnClickOutside = () => {
        if(isDisplayedCalendar){
            setIsDisplayedCalendar(false);
        }
    };

    useClickOutside(calendarRef, callbackOnClickOutside);

    return(
        <div className={styles.panel}>
            <div className={styles.panel_input}>
                <svg width="16" height="16">
                    <use href={sprite + '#icon-admin-search'} fill="none"></use>
                </svg>
                <input
                    type="text"
                    placeholder="Пошук за ID, замовником ..."
                    // ref={inputRef}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className={styles.panel_date}>
                <div className={styles.panel_chosenDates} onClick={displayCalendar}>
                    <svg width="18" height="20">
                        <use href={sprite + '#icon-admin-calendar'} fill="none"></use>
                    </svg>
                    {chosenDates && <p>{chosenDates[0]} <span>—</span> {chosenDates[1]}</p>}
                </div>
                {isDisplayedCalendar &&
                    <div ref={calendarRef}>
                        <Calendar locale={'UK'}
                                  className={styles.react_calendar}
                                  onChange={setCalendarValues}
                                  value={calendarValues}
                                  selectRange={true}
                        />
                    </div>}
            </div>
        </div>
    )
}