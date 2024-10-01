import styles from "@/Admin/OrdersPage/SearchAndFilterPanel/SearchAndFilterPanel.module.css";
import sprite from "@/assets/icons/sprite.svg";
import Calendar from "react-calendar";
import React, {useEffect, useRef, useState} from "react";
import {setDates} from "@/redux/ordersSlice.js";
import {useClickOutside} from "@/hooks/useClickOutside.js";
import {useDispatch} from "react-redux";

export const FilterDate = () => {
    const [isDisplayedCalendar, setIsDisplayedCalendar] = useState(false);
    const [calendarValues, setCalendarValues] = useState(null);
    const [formattedDates, setFormattedDates] = useState({displayDates: [], backendDates: []});
    const dispatch = useDispatch();
    const calendarRef = useRef(null);

    useEffect(() => {
        if (calendarValues && calendarValues.length === 2) {
            const displayDates = calendarValues.map(date => {
                const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
                const isoDate = localDate.toISOString().split('T')[0];
                const [year, month, day] = isoDate.split('-');
                return `${day}-${month}-${year}`;
            });

            const backendDates = calendarValues.map(date => {
                const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
                return localDate.toISOString().split('T')[0];
            });

            setFormattedDates({displayDates, backendDates});
        }
    }, [calendarValues]);

    useEffect(() => {
        dispatch(setDates({
                startDate: formattedDates.backendDates[0],
                endDate: formattedDates.backendDates[1]
            }
        ));
    }, [formattedDates.backendDates]);

    const displayCalendar = () => {
        setIsDisplayedCalendar(true);
    }

    const callbackOnClickOutside = () => {
        setIsDisplayedCalendar(false);
    };

    useClickOutside(calendarRef, callbackOnClickOutside);

    return (
        <div className={styles.panel_date} ref={calendarRef}>
            <div className={styles.panel_chosenDates} onClick={displayCalendar}>
                <svg width="18" height="20">
                    <use href={sprite + '#icon-admin-calendar'} fill="none"></use>
                </svg>
                {formattedDates.displayDates && (
                    <p>
                        {formattedDates.displayDates.length === 0 ? (
                            "Обрати дати"
                        ) : (
                            <>
                                {formattedDates.displayDates[0]}
                                {formattedDates.displayDates[0] !== formattedDates.displayDates[1] && (
                                    <> <span>—</span> {formattedDates.displayDates[1]}</>
                                )}
                            </>
                        )}
                    </p>
                )}
            </div>
            {isDisplayedCalendar &&
                <div>
                    <Calendar locale={'UK'}
                              className={styles.react_calendar}
                              onChange={setCalendarValues}
                              value={calendarValues}
                              selectRange={true}
                    />
                </div>}
        </div>
    )
}