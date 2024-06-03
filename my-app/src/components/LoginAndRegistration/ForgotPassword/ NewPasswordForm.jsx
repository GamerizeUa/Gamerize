import styles from "../LoginAndRegistration.module.css";
import sprite from "../../../assets/icons/sprite.svg";
import React, {useEffect, useState} from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import useNoScroll from "../../hooks/useNoScroll.js";

export const NewPasswordForm = ({setIsDisplayedNewPasswordForm}) => {
    const location = useLocation();
    const [emailParam, setEmailParam] = useState("");
    const navigate = useNavigate()
    useNoScroll(true);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setEmailParam(params.get('email'))
    }, [])

    const schema = emailParam ? (yup.object().shape({
        email: yup.string().required("Введіть е-пошту")
            .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/i, "Введіть коректну е-пошту"),
        password: yup.string().required("Введіть пароль").matches(
            /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{6,}$/,
            'Мінімум 6 символів, цифра, велика та мала літери, спецсимвол'
        ),
        repeatPassword: yup.string().oneOf([yup.ref('password'), null],
            'Паролі повинні співпадати').required("Повторіть пароль")
    })) : (
        yup.object().shape({
            newPassword: yup.string().required("Введіть пароль").matches(
                /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{6,}$/,
                'Мінімум 6 символів, цифра, велика та мала літери, спецсимвол'
            ),
            password: yup.string().required("Введіть пароль").matches(
                /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{6,}$/,
                'Мінімум 6 символів, цифра, велика та мала літери, спецсимвол'
            ),
            repeatNewPassword: yup.string().oneOf([yup.ref('newPassword'), null],
                'Паролі повинні співпадати').required("Повторіть пароль")
        })
    );

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const closePopupByClicking = (event) => {
        if (event.currentTarget === event.target) {
            closePopUp();
        }
    }

    const closePopUp = () => {
        setIsDisplayedNewPasswordForm(false);
    }

    const onSubmit = (data) => {
        if(emailParam){
            Axios.post('https://gamerize.ltd.ua/api/Login/reset-password', data)
                .then(() => {
                    closePopUp();
                    navigate('/');
                })
        }else{
            Axios.post('https://gamerize.ltd.ua/api/Account/change-password', data)
                .then(() => {
                    closePopUp();
                    navigate('/');
                })
        }

    }

    return (
        <div className={styles.popUp_background} onClick={closePopupByClicking}>
            <div className={styles.popUp}>
                <div className={styles.popUp_header}>
                    <p className={styles.popUp_title}></p>
                    <div className={styles.popUp_cross} onClick={closePopUp}></div>
                </div>
                    <p className={styles.changePassword}>Змінити пароль</p>
                <div className={styles.popUp_container}>
                    <form className={styles.popUp_form} onSubmit={handleSubmit(onSubmit)}>
                        {emailParam ? (<div className={styles.popUp_formGroup}>
                            <label>Електронна пошта*</label>
                            <div className={styles.popUp_inputContainer}>
                                <svg width="24" height="24">
                                    <use
                                        href={sprite + "#icon-email"}
                                        fill="#EEF1FF"
                                        stroke="currentColor"
                                    ></use>
                                </svg>
                                <input type="text" value={emailParam || ''} {...register("email")} readOnly/>
                            </div>
                            <p className={styles.input_error}>{errors.email?.message}</p>
                        </div>)
                            : (<div className={styles.popUp_formGroup}>
                            <label>Поточний пароль*</label>
                            <div className={styles.popUp_inputContainer}>
                                <svg width="24" height="24">
                                    <use
                                        href={sprite + "#icon-lock"}
                                        fill="#EEF1FF"
                                        stroke="currentColor"
                                    ></use>
                                </svg>
                                <input type="password" {...register("password")}/>
                            </div>
                            <p className={styles.input_error}>{errors.password?.message}</p>
                        </div>)}
                        <div className={styles.popUp_formGroup}>
                            <label>{emailParam ? 'Пароль*': 'Новий пароль*' }</label>
                            <div className={styles.popUp_inputContainer}>
                                <svg width="24" height="24">
                                    <use
                                        href={sprite + "#icon-lock"}
                                        fill="#EEF1FF"
                                        stroke="currentColor"
                                    ></use>
                                </svg>
                                <input type="password"
                                       {...register(emailParam ? "password" : "newPassword")}
                                />
                            </div>
                            <p className={styles.input_error}>
                                {emailParam ? errors.password?.message : errors.newPassword?.message}
                            </p>
                        </div>
                        <div className={styles.popUp_formGroup}>
                            <label>{emailParam ? 'Повторити пароль*': 'Повторити новий пароль*' }</label>
                            <div className={styles.popUp_inputContainer}>
                                <svg width="24" height="24">
                                    <use
                                        href={sprite + "#icon-lock"}
                                        fill="#EEF1FF"
                                        stroke="currentColor"
                                    ></use>
                                </svg>
                                <input
                                    type="password"
                                    {...register(emailParam ? "repeatPassword" : "repeatNewPassword")}
                                />
                            </div>
                            <p className={styles.input_error}>
                                {emailParam ? errors.repeatPassword?.message : errors.repeatNewPassword?.message }
                            </p>
                        </div>
                        <button type="submit">Змінити пароль</button>
                    </form>
                </div>
            </div>
        </div>
    )
}