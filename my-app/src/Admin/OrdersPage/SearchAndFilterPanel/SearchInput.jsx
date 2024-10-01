import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrdersByFilter} from "@/redux/ordersSlice.js";
import {useClickOutside} from "@/hooks/useClickOutside.js";

export const SearchInput = ({setIsTermSearched}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { currentPage } = useSelector((state) => state.orders);
    const inputRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        findBySearchTerm();
    }, [currentPage, searchTerm]);

    const findBySearchTerm = () => {
        if (searchTerm) {
            dispatch(fetchOrdersByFilter(searchTerm));
            setIsTermSearched(true);
        } else {
            setIsTermSearched(false);
        }
    };

    const callbackOnClickOutside = () => {
        setIsTermSearched(false);
        inputRef.current.value = '';
    };

    useClickOutside(inputRef, callbackOnClickOutside);

    return (
        <input
            type="text"
            placeholder="Пошук за ID, замовником ..."
            ref={inputRef}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    )
}