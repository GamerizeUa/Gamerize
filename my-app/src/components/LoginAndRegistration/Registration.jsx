import styles from "./LoginAndRegistration.module.css";
import sprite from "../../assets/icons/sprite.svg";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import Axios from "axios";
import React, {useState} from "react";
import useNoScroll from "../hooks/useNoScroll.js"
import Lottie  from 'lottie-react';
import mailNotSentAnimation from '../../assets/images/confirmEmail.json';

export const Registration = ({setIsDisplayedRegistrationPopUp, setDisplayedLoginPopUp}) => {
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    const [isConfirmMessage, setIsConfirmMessage] = useState(false);
    useNoScroll(true);

    const schema = yup.object().shape({
        name: yup.string().required('Введіть ім\'я та прізвище')
            .matches(/^[a-zA-Zа-яіА-ЯІ'\-]+\s[a-zA-Zа-яіА-ЯІ'\-]+$/i, 'Введіть ім\'я та прізвище'),
        email: yup.string().required("Введіть е-пошту")
            .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/i, "Введіть коректну е-пошту"),
        password: yup.string().required("Введіть пароль").matches(
            /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{6,}$/,
            'Мінімум 6 символів, цифра, велика та мала літери, спецсимвол'
        ),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null],
            'Паролі повинні співпадати').required("Повторіть пароль")
    });

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
        setDisplayedLoginPopUp(false);
        setIsDisplayedRegistrationPopUp(false);
    };

    const onSubmit = (data) => {
        Axios.post('https://gamerize.ltd.ua/api/Register/register', data)
            .then(() => {
                setIsConfirmMessage(true)
            })
            .catch(() => setIsErrorVisible(true))
    }

    return (
        <div className={styles.popUp_background} onClick={closePopupByClicking}>
            <div className={styles.popUp}>
                <div className={styles.popUp_header}>
                    <p className={styles.popUp_title}>Реєстрація</p>
                    <div className={styles.popUp_cross} onClick={closePopUp}></div>
                </div>
                <div className={styles.popUp_container}>
                    {isConfirmMessage ?
                        (<div className={styles.confirmEmail}>
                            <Lottie animationData={mailNotSentAnimation} className={styles.confirmEmail_gif} />
                            <div className={styles.confirmEmail_info}>
                                <p className={styles.confirmEmail_title}>Перейдіть за посиланням у листі</p>
                                <p className={styles.confirmEmail_subtitle}>
                                    Підтвердіть email, щоб завершити створення профілю.
                                </p>
                            </div>
                        </div>)
                        : (
                            <form className={styles.popUp_form} onSubmit={handleSubmit(onSubmit)}>
                                <div className={styles.popUp_formGroup}>
                                    <label>Ім'я та Прізвище*</label>
                                    <div className={styles.popUp_inputContainer}>
                                        <svg width="20" height="20">
                                            <use
                                                href={sprite + "#icon-user24"}
                                                fill="none"
                                            ></use>
                                        </svg>
                                        <input type="text" {...register("name")}/>
                                    </div>
                                    <p className={styles.input_error}>{errors.name?.message}</p>
                                </div>
                                <div className={styles.popUp_formGroup}>
                                    <label>Електронна пошта*</label>
                                    <div className={styles.popUp_inputContainer}>
                                        <svg width="24" height="24">
                                            <use
                                                href={sprite + "#icon-email"}
                                                fill="#EEF1FF"
                                                stroke="currentColor"
                                            ></use>
                                        </svg>
                                        <input type="text" {...register("email")}/>
                                    </div>
                                    <p className={styles.input_error}>{errors.email?.message}</p>
                                </div>
                                <div className={styles.popUp_formGroup}>
                                    <label>Пароль*</label>
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
                                </div>
                                <div className={styles.popUp_formGroup}>
                                    <label>Повторити пароль*</label>
                                    <div className={styles.popUp_inputContainer}>
                                        <svg width="24" height="24">
                                            <use
                                                href={sprite + "#icon-lock"}
                                                fill="#EEF1FF"
                                                stroke="currentColor"
                                            ></use>
                                        </svg>
                                        <input type="password" {...register("confirmPassword")}/>
                                    </div>
                                    <p className={styles.input_error}>{errors.confirmPassword?.message}</p>
                                </div>
                                <hr className={styles.popUp_registrationHr}/>
                                <button type="submit">Зареєструватись</button>
                                {isErrorVisible &&
                                    <p className={styles.input_userError}>Користувач з такою е-поштою вже існує</p>}
                            </form>
                        )}
                </div>
            </div>
        </div>
    );
};
