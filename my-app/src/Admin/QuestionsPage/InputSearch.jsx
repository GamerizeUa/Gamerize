import styles from "./Questions.module.css";
import sprite from "../../assets/icons/sprite.svg";
import React, {useEffect, useRef, useState} from "react";
import {fetchQuestions, fetchQuestionsBySearch} from "../../redux/questionsSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useClickOutside} from "../../components/hooks/useClickOutside.js";

export const InputSearch = ({setIsTermSearched}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const {currentPage} = useSelector(state => state.questions);
    const inputRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        findBySearchTerm();
    }, [currentPage, searchTerm]);

    const findBySearchTerm = () => {
        if(searchTerm){
            dispatch(fetchQuestionsBySearch(searchTerm))
            setIsTermSearched(true)
        }else{
            setIsTermSearched(false)
        }
    }

    const callbackOnClickOutside = () => {
        dispatch(fetchQuestions())
        inputRef.current.value = '';
    }

    useClickOutside(inputRef, callbackOnClickOutside);

    return (
        <div className={styles.questions_input}>
            <svg width="16" height="16">
                <use
                    href={sprite + '#icon-admin-search'}
                    fill="none">
                </use>
            </svg>
            <input
                type="text"
                placeholder="Пошук"
                ref={inputRef}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    )
}